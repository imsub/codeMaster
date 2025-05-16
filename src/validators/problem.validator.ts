import { injectable, inject } from 'inversify';
import Joi from 'joi';
import { CustomError, LogDecorator } from '../utils';
import { Request, Response, NextFunction } from 'express';

/**
 * Validator class for problem input
 */
@injectable()
export class ProblemValidator {
  @LogDecorator.LogMethod()
  validateProblemInput(req: Request, res: Response, next: NextFunction): void {
    // Optionally, add logging here if needed:
    // LogDecorator.logMethodCall('validateProblemInput', req);
    const schema = Joi.object({
      title: Joi.string().min(1).required(),
      description: Joi.string().min(1).required(),
      difficulty: Joi.string().valid('EASY', 'MEDIUM', 'HARD').required(),
      tags: Joi.array().items(Joi.string()).min(1).required(),
      examples: Joi.object()
        .pattern(
          Joi.string().valid('PYTHON', 'JAVASCRIPT', 'JAVA'),
          Joi.object({
            input: Joi.string().required(),
            output: Joi.string().required(),
            explanation: Joi.string().required(),
          })
        )
        .required(),
      constraints: Joi.string().required(),
      testCases: Joi.array()
        .items(
          Joi.object({
            input: Joi.string().required(),
            output: Joi.string().required(),
          })
        )
        .min(1)
        .required(),

      codeSnippet: Joi.object()
        .pattern(
          Joi.string().valid('PYTHON', 'JAVASCRIPT', 'JAVA'),
          Joi.string()
        )
        .required(),
      referenceSolution: Joi.object()
        .pattern(
          Joi.string().valid('PYTHON', 'JAVASCRIPT', 'JAVA'),
          Joi.string()
        )
        .required(),
      hints: Joi.string().optional().allow(''),
      editorial: Joi.string().optional().allow(''),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }
    next();
  }
  @LogDecorator.LogMethod()
  validateProblemId(req: Request, res: Response, next: NextFunction): void {
    const schema = Joi.object({
      id: Joi.string().min(1).required(),
    });
    const { error } = schema.validate(req.params);
    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }
    next();
  }
}
