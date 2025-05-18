import {injectable, inject} from "inversify";
import {Request, Response} from "express";
import {TYPES} from "../types";
import {IAuthService} from "../interfaces";
import {AuthService} from "../services";
import {CustomError} from "../utils/errors";
import {LogDecorator} from "../utils/decorator";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import {
  sendEmail,
  emailVerificationMailgenContent,
  forgotPasswordMailgenContent,
} from "../utils";
/**
 * Controller class for authentication endpoints
 */
@injectable()
export class AuthController {
  constructor(@inject(TYPES.AuthService) private authService: AuthService) {}

  @LogDecorator.LogMethod()
  async register(req: Request, res: Response) {
    const {email, password, firstName, middleName, lastName, role} = req.body;
    const _emailAvailable = await this.authService.isEmailTaken(email);
    if (_emailAvailable) {
      throw new CustomError("Email already taken", 500);
    }
    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS) || 5
    );
    const token = await this.generateTemporaryToken();
    const emailVerificationToken = token.hashedToken;
    const emailVerificationExpiry = token.tokenExpiry;
    const result = await this.authService.createUser({
      ...req.body,
      password: hashedPassword,
      emailVerificationToken,
      emailVerificationExpiry,
    });
    if (!result) {
      throw new CustomError("User creation failed", 500);
    }
    const name =
      lastName && middleName
        ? `${firstName} ${middleName} ${lastName}`
        : `${firstName} ${middleName || lastName}`;
    const mailContent = emailVerificationMailgenContent(
      name,
      `http://localhost:${process.env.PORT}/verifyEmail/${token.unHashedToken}`
    );
    await sendEmail({
      email,
      subject: "Verify Email",
      mailgenContent: mailContent,
    });
    (res as Response).sendResponse(null, "User created successfully", 201);
  }

  @LogDecorator.LogMethod()
  async login(req: Request, res: Response) {
    const {email, password} = req.body;
    const _userInfo = await this.authService.getUserByEmail(email);
    if (!_userInfo?.email) {
      throw new CustomError("Incorrect Email.", 401);
    }
    const isPaswordCorrect = await bcrypt.compare(password, _userInfo.password);
    if (!isPaswordCorrect) throw new CustomError("Incorrect Password", 401);

    const accessToken = await this.authService.getToken({
      tokenType: `access`,
      id: _userInfo.id,
      email: _userInfo.email,
      role: _userInfo.role,
    });
    const refreshToken = await this.authService.getToken({
      tokenType: `refresh`,
      id: _userInfo.id,
      role: _userInfo.role,
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1 * 24 * 60 * 60 * 1000, // 1 days in milliseconds
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    });

    (res as Response).sendResponse(
      {id: _userInfo.id, email: _userInfo.email},
      "User created successfully",
      201
    );
  }

  @LogDecorator.LogMethod()
  async logout(req: Request, res: Response) {
    const {email, role, id} = req.user || {};
    const response = await this.authService.getRecordByMultipleFields({
      email,
      role,
      id,
    });
    const {email: _email} = req.body;
    if (_email !== email) {
      throw new CustomError("Invalid Email", 401);
    }
    if (!!response) {
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      (res as Response).sendResponse(
        {id, email},
        "Logged out successfully",
        200
      );
    } else {
      throw new CustomError("Invalid token", 401);
    }
  }

  private async generateTemporaryToken(): Promise<{
    unHashedToken: string;
    hashedToken: string;
    tokenExpiry: Date;
  }> {
    // This token should be client facing
    // for example: for email verification unHashedToken should go into the user's mail
    const unHashedToken: string = crypto.randomBytes(20).toString("hex");

    // This should stay in the DB to compare at the time of verification
    const hashedToken = crypto
      .createHash("sha256")
      .update(unHashedToken)
      .digest("hex");
    // This is the expiry time for the token (20 minutes)
    const tokenExpiry = new Date();
    //expiryDate.setHours(expiryDate.getHours() + 24); // Expires in 24 hours
    tokenExpiry.setMinutes(tokenExpiry.getMinutes() + 20); // Expires in 20 minutes
    //const tokenExpiry = Date.now() + 20 * 60 * 1000; // 20 minutes;

    return {unHashedToken, hashedToken, tokenExpiry};
  }
  @LogDecorator.LogMethod()
  async verifyTemporaryToken(req: Request, res: Response) {
    // This token should be client facing
    // for example: for email verification unHashedToken should go into the user's mail
    const {token} = req.params; //unhashed token
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const response = await this.authService.getRecordByMultipleFields({
      emailVerificationToken: hashedToken,
      emailVerificationExpiry: {
        gte: new Date(),
      },
      isEmailVerified: false,
    });
    if (!!response) {
      const result = await this.authService.updateUser(
        response.id as any,
        {
          emailVerificationToken: null,
          emailVerificationExpiry: new Date(0),
          isEmailVerified: true,
        } as any
      );
      if (!!result) {
        (res as Response).sendResponse(
          {isEmailVerified: result.isEmailVerified, email: result.email},
          "Email verified successfully",
          200
        );
      } else {
        throw new CustomError("Email verification failed", 500);
      }
    } else {
      throw new CustomError("Invalid token", 401);
    }
  }
  @LogDecorator.LogMethod()
  async refreshToken(req: Request, res: Response) {
    const {refreshToken} = req.cookies;
    const {email: _email} = req.body;
    const {email, role, id} = req.user || {};
    if (_email !== email) {
      throw new CustomError("Invalid token", 401);
    }
    const response = await this.authService.getRecordByMultipleFields({
      email,
      role,
      id,
    });
    if (!!response) {
      const accessToken = await this.authService.getToken({
        tokenType: `access`,
        id: response.id,
        email: response.email,
        role: response.role,
      });
      const _refreshToken = await this.authService.getToken({
        tokenType: `refresh`,
        id: response.id,
        role: response.role,
      });
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 days in milliseconds
      });
      res.cookie("refreshToken", _refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      });
      (res as Response).sendResponse(
        {email: response.email},
        "Access token refreshed successfully",
        200
      );
    } else {
      throw new CustomError("Invalid token", 401);
    }
  }
  @LogDecorator.LogMethod()
  async forgotPassword(req: Request, res: Response) {
    const {email} = req.body;
    const _userInfo = await this.authService.getUserByEmail(email);
    if (!_userInfo?.email) {
      throw new CustomError("Incorrect Email.", 401);
    }
    const token = await this.generateTemporaryToken();
    const forgotPasswordToken = token.hashedToken;
    const forgotPasswordExpiry = token.tokenExpiry;
    const result = await this.authService.updateUser(
      _userInfo.id as any,
      {
        forgotPasswordToken,
        forgotPasswordExpiry,
      } as any
    );
    if (!result) {
      throw new CustomError("Password reset failed", 500);
    }
    const name =
      _userInfo.lastName && _userInfo.middleName
        ? `${_userInfo.firstName} ${_userInfo.middleName} ${_userInfo.lastName}`
        : `${_userInfo.firstName} ${_userInfo.middleName || _userInfo.lastName}`;
    const mailContent = forgotPasswordMailgenContent(
      name,
      `http://localhost:${process.env.PORT}/verifyForgotPassword/${token.unHashedToken}`
    );
    await sendEmail({
      email: email,
      subject: "Reset Password",
      mailgenContent: mailContent,
    });

    (res as Response).sendResponse({email}, "Password reset link sent", 200);
  }
  @LogDecorator.LogMethod()
  async verifyForgotPassword(req: Request, res: Response) {
    const {token} = req.params; // unhashed token
    const {password} = req.body;
    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS) || 5
    );
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const response = await this.authService.getRecordByMultipleFields({
      forgotPasswordToken: hashedToken,
      forgotPasswordExpiry: {
        gte: new Date(),
      },
      isEmailVerified: true,
    });
    if (!!response) {
      const result = await this.authService.updateUser(
        response.id as any,
        {
          forgotPasswordToken: null,
          forgotPasswordExpiry: null,
          password: hashedPassword,
        } as any
      );
      if (!!result) {
        (res as Response).sendResponse(
          {email: result.email},
          "Password reset successfully",
          200
        );
      } else {
        throw new CustomError("Password reset failed", 500);
      }
    } else {
      throw new CustomError("Invalid token", 401);
    }
  }
  @LogDecorator.LogMethod()
  async resendEmailVerification(req: Request, res: Response) {
    const {email} = req.body;
    const _userInfo = await this.authService.getRecordByMultipleFields({
      email,
      isEmailVerified: false,
    });
    if (!_userInfo?.email) {
      throw new CustomError("Incorrect Email or Email already verified", 401);
    }
    const token = await this.generateTemporaryToken();
    const emailVerificationToken = token.hashedToken;
    const emailVerificationExpiry = token.tokenExpiry;
    const result = await this.authService.updateUser(
      _userInfo.id as any,
      {
        emailVerificationToken,
        emailVerificationExpiry,
      } as any
    );
    if (!result) {
      throw new CustomError("Email verification failed", 500);
    }
    const name =
      _userInfo.lastName && _userInfo.middleName
        ? `${_userInfo.firstName} ${_userInfo.middleName} ${_userInfo.lastName}`
        : `${_userInfo.firstName} ${_userInfo.middleName || _userInfo.lastName}`;
    const mailContent = emailVerificationMailgenContent(
      name,
      `http://localhost:${process.env.PORT}/verifyEmail/${token.unHashedToken}`
    );
    await sendEmail({
      email: email,
      subject: "Verify Email",
      mailgenContent: mailContent,
    });

    (res as Response).sendResponse(
      {email},
      "Email verification link sent",
      200
    );
  }
  @LogDecorator.LogMethod()
  async changeCurrentPassword(req: Request, res: Response) {
    const {currentPassword, newPassword} = req.body;
    const {email, role, id} = req.user || {};
    const response = await this.authService.getRecordByMultipleFields({
      email,
      role,
      id,
    });
    if (!!response) {
      const isPaswordCorrect = await bcrypt.compare(
        currentPassword,
        response.password
      );
      if (!isPaswordCorrect) throw new CustomError("Incorrect Password", 401);
      const hashedPassword = await bcrypt.hash(
        newPassword,
        Number(process.env.SALT_ROUNDS) || 5
      );
      const result = await this.authService.updateUser(
        response.id as any,
        {
          password: hashedPassword,
        } as any
      );

      if (!!result) {
        (res as Response).sendResponse(
          {email: result.email},
          "Password changed successfully",
          200
        );
      } else {
        throw new CustomError("Password change failed", 500);
      }
    } else {
      throw new CustomError("Invalid token", 401);
    }
  }
  @LogDecorator.LogMethod()
  async getProfile(req: Request, res: Response) {
    const {id, email} = req.user || {};
    const response = await this.authService.getRecordByMultipleFields({
      id,
    });
    const {email: _email} = req.body;
    if (_email !== email) {
      throw new CustomError("Invalid Email", 401);
    }
    if (!!response) {
      (res as Response).sendResponse(
        {email: response.email, role: response.role},
        "User profile fetched successfully",
        200
      );
    } else {
      throw new CustomError("User not found", 404);
    }
  }
}
