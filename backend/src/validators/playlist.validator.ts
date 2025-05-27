import {injectable, inject} from "inversify";
import Joi from "joi";
import {CustomError, LogDecorator} from "../utils";
import {Request, Response, NextFunction} from "express";

@injectable()
export class PlaylistValidator {
  @LogDecorator.LogMethod()
  validatePlaylistId(req: Request, res: Response, next: NextFunction): void {
    const schema = Joi.object({
      playlistId: Joi.string().uuid({version: "uuidv4"}).required().messages({
        "string.empty": "Playlist ID cannot be empty",
        "any.required": "Playlist ID is required",
      }),
    });

    const {error} = schema.validate(req.params);

    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }

    next();
  }
  @LogDecorator.LogMethod()
  validateCreatePlaylist(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    const schema = Joi.object({
      name: Joi.string().min(3).max(100).required().messages({
        "string.empty": "Name cannot be empty",
        "any.required": "Name is required",
      }),
      description: Joi.string().max(500).optional().messages({
        "string.max": "Description cannot exceed 500 characters",
      }),
    });
    const {error} = schema.validate(req.body);

    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }

    next();
  }
  @LogDecorator.LogMethod()
  validateAddProblemToPlaylist(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    // Ensure problemIds is an array
    const {playlistId} = req.params;
    const {problemIds} = req.body; // Acce
    const schema = Joi.object({
      playlistId: Joi.string().uuid({version: "uuidv4"}).required().messages({
        "string.empty": "Playlist ID cannot be empty",
        "any.required": "Playlist ID is required",
      }),
      problemIds: Joi.array()
        .items(Joi.string().uuid({version: "uuidv4"}).required())
        .min(1)
        .required()
        .messages({
          "array.base": "Problem IDs must be an array",
          "array.min": "At least one problem ID is required",
          "any.required": "Problem IDs are required",
          "string.empty": "Problem ID cannot be empty",
        }),
    });
    const {error} = schema.validate({playlistId, problemIds});

    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }

    next();
  }
}
