import Joi from 'joi';
import { injectable, inject } from 'inversify';
import { CustomError, LogDecorator } from '../utils';
import { Request, Response, NextFunction } from 'express';

@injectable()
export class AuthValidator {
  constructor() {}

  @LogDecorator.LogMethod()
  validateRegister(req: Request, res: Response, next: NextFunction): void {
    const { error } = Joi.object({
      firstName: Joi.string().min(3).max(30).required(),
      lastName: Joi.string().min(3).max(30).optional(),
      middleName: Joi.string().min(3).max(30).optional(),
      image: Joi.string().min(3).optional(),
      avatar: Joi.object().optional(),
      createdAt: Joi.date().timestamp().optional(),
      temporaryPasswordExpiry: Joi.date().timestamp().optional(),
      forgotPasswordExpiry: Joi.date().timestamp().optional(),
      temporaryPassword: Joi.string().optional().default(null),
      updatedAt: Joi.date().timestamp().optional(),
      emailVerificationExpiry: Joi.date().timestamp().optional(),
      refreshToken: Joi.string().optional().default(null),
      emailVerificationToken: Joi.string().optional().default(null),
      forgotPasswordToken: Joi.string().optional().default(null),
      role: Joi.string().valid('ADMIN', 'USER').required().default('USER'),
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
      password: Joi.string()
        .min(8)
        .required()
        .pattern(
          new RegExp(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
          )
        )
        .message(
          'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.'
        ),
    }).validate(req.body);
    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }
    return next();
  }
  @LogDecorator.LogMethod()
  validateLogin(req: Request, res: Response, next: NextFunction): void {
    const { error } = Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
      password: Joi.string()
        .min(8)
        .required()
        .pattern(
          new RegExp(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
          )
        )
        .message(
          'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.'
        ),
    }).validate(req.body);
    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }
    return next();
  }
  @LogDecorator.LogMethod()
  validateLogout(req: Request, res: Response, next: NextFunction): void {
    const { accessToken, refreshToken } = req.cookies;
    const tokenSchema = Joi.object({
      accessToken: Joi.string()
        .pattern(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/)
        .required()
        .messages({
          'string.pattern.base': 'Invalid access token format.',
          'any.required': 'Access token is required.',
        }),
      refreshToken: Joi.string()
        .pattern(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/)
        .required()
        .messages({
          'string.pattern.base': 'Invalid refresh token format.',
          'any.required': 'Refresh token is required.',
        }),
    });
    const { error: tokenError } = tokenSchema.validate({
      accessToken,
      refreshToken,
    });

    if (tokenError) {
      throw new CustomError(tokenError.details[0].message, 400);
    }

    const { error: bodyError } = Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
          'string.email': 'Invalid email format.',
          'any.required': 'Email is required.',
        }),
    }).validate(req.body);

    if (bodyError) {
      throw new CustomError(bodyError.details[0].message, 400);
    }

    return next();
  }
  @LogDecorator.LogMethod()
  validateVerifyEmail(req: Request, res: Response, next: NextFunction): void {
    const { token } = req.params ?? req.body;
    const tokenSchema = Joi.object({
      token: Joi.string()
        .pattern(/^[0-9a-f]{40}$/i)
        .required()
        .messages({
          'Invalid access token format.': 'Invalid access token format.',
        }),
    });
    const { error: tokenError } = tokenSchema.validate({
      token,
    });
    if (tokenError) {
      throw new CustomError(tokenError.details[0].message, 400);
    }

    return next();
  }
  @LogDecorator.LogMethod()
  validateRefreshToken(req: Request, res: Response, next: NextFunction): void {
    const { refreshToken } = req.cookies;
    const tokenSchema = Joi.object({
      refreshToken: Joi.string()
        .pattern(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/)
        .required()
        .messages({
          'string.pattern.base': 'Invalid refresh token format.',
          'any.required': 'Refresh token is required.',
        }),
    });
    const { error: tokenError } = tokenSchema.validate({
      refreshToken,
    });

    if (tokenError) {
      throw new CustomError(tokenError.details[0].message, 400);
    }
    const { error } = Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
    }).validate(req.body);
    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }

    return next();
  }
  @LogDecorator.LogMethod()
  validateForgotPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    const { error } = Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
    }).validate(req.body);
    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }
    return next();
  }
  @LogDecorator.LogMethod()
  validateResetPassword(req: Request, res: Response, next: NextFunction): void {
    const { token } = req.params ?? req.body;
    const tokenSchema = Joi.object({
      token: Joi.string()
        .pattern(/^[0-9a-f]{40}$/i)
        .required()
        .messages({
          'Invalid access token format.': 'Invalid access token format.',
        }),
    });
    const { error: tokenError } = tokenSchema.validate({
      token,
    });
    if (tokenError) {
      throw new CustomError(tokenError.details[0].message, 400);
    }
    const { error } = Joi.object({
      password: Joi.string()
        .min(8)
        .required()
        .pattern(
          new RegExp(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
          )
        )
        .message(
          'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.'
        ),
    }).validate(req.body);
    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }
    return next();
  }
  @LogDecorator.LogMethod()
  validateResendEmailVerification(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    const { accessToken, refreshToken } = req.cookies;
    const tokenSchema = Joi.object({
      accessToken: Joi.string()
        .pattern(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/)
        .required()
        .messages({
          'string.pattern.base': 'Invalid access token format.',
          'any.required': 'Access token is required.',
        }),
      refreshToken: Joi.string()
        .pattern(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/)
        .required()
        .messages({
          'string.pattern.base': 'Invalid refresh token format.',
          'any.required': 'Refresh token is required.',
        }),
    });
    const { error: tokenError } = tokenSchema.validate({
      accessToken,
      refreshToken,
    });

    if (tokenError) {
      throw new CustomError(tokenError.details[0].message, 400);
    }

    const { error } = Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
    }).validate(req.body);
    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }
    return next();
  }
  @LogDecorator.LogMethod()
  validateChangeCurrentPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    const { accessToken, refreshToken } = req.cookies;
    const tokenSchema = Joi.object({
      accessToken: Joi.string()
        .pattern(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/)
        .required()
        .messages({
          'string.pattern.base': 'Invalid access token format.',
          'any.required': 'Access token is required.',
        }),
      refreshToken: Joi.string()
        .pattern(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/)
        .required()
        .messages({
          'string.pattern.base': 'Invalid refresh token format.',
          'any.required': 'Refresh token is required.',
        }),
    });
    const { error: tokenError } = tokenSchema.validate({
      accessToken,
      refreshToken,
    });

    if (tokenError) {
      throw new CustomError(tokenError.details[0].message, 400);
    }
    const { error } = Joi.object({
      currentPassword: Joi.string()
        .min(8)
        .required()
        .pattern(
          new RegExp(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
          )
        )
        .message(
          'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.'
        ),
      newPassword: Joi.string()
        .min(8)
        .required()
        .pattern(
          new RegExp(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
          )
        )
        .message(
          'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.'
        ),
    }).validate(req.body);
    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }
    return next();
  }
}
