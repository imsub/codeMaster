import {injectable} from "inversify";
import Joi from "joi";
import {CustomError, LogDecorator} from "../utils";
import {Request, Response, NextFunction} from "express";

/**
 * Validator class for problem input
 */
@injectable()
export class SubmissionValidator {
  @LogDecorator.LogMethod()
  validateProblemId(req: Request, res: Response, next: NextFunction): void {
    const {accessToken, refreshToken} = req.cookies;
    const tokenSchema = Joi.object({
      accessToken: Joi.string()
        .pattern(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/)
        .required()
        .messages({
          "string.pattern.base": "Invalid access token format.",
          "any.required": "Access token is required.",
        }),
      refreshToken: Joi.string()
        .pattern(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/)
        .required()
        .messages({
          "string.pattern.base": "Invalid refresh token format.",
          "any.required": "Refresh token is required.",
        }),
    });
    const {error: tokenError} = tokenSchema.validate({
      accessToken,
      refreshToken,
    });

    if (tokenError) {
      throw new CustomError(tokenError.details[0].message, 400);
    }
    const schema = Joi.object({
      id: Joi.string().uuid({version: "uuidv4"}).required(),
    });
    const {error} = schema.validate(req.params);
    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }
    next();
  }
}
