import Joi, { number } from 'joi';
import { injectable, inject } from 'inversify';
import { CustomError, LogDecorator } from '../utils';
import { Request, Response, NextFunction } from 'express';

@injectable()
export class ExecuteCodeValidator {
  constructor() {}

  @LogDecorator.LogMethod()
  validateExecuteCode(req: Request, res: Response, next: NextFunction): void {
    const schema = Joi.object({
      language_id: Joi.number().required(),
      source_code: Joi.string().required(),
      stdin: Joi.array().items(Joi.any()).min(1).required(),
      expected_outputs: Joi.array().items(Joi.any()).min(1).required(),
      problemId: Joi.string().uuid({ version: 'uuidv4' }).required(),
    }).custom((value, helpers) => {
      // Ensure both arrays are of equal length
      if (value.stdin.length !== value.expected_outputs.length) {
        return helpers.message({
          custom: `"stdin" and "expected_outputs" must have the same number of items`,
        });
      }
      return value;
    });
    const { error } = schema.validate(req.body);
    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }

    next();
  }
}
