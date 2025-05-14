// import { injectable } from 'inversify';
// import { z } from 'zod';
// import { CustomError } from '../utils/errors';

// const userSchema = z.object({
//   email: z.string().email(),
//   password: z.string().min(6),
//   name: z.string().optional(),
// });

// /**
//  * Validator class for user input
//  */
// @injectable()
// export class UserValidator {
//   validateUserInput(data: any): {
//     email: string;
//     password: string;
//     name?: string;
//   } {
//     try {
//       return userSchema.parse(data);
//     } catch (error) {
//       throw new CustomError('Invalid user input', 400, error);
//     }
//   }
// }
