// import { injectable, inject } from 'inversify';
// import { Request, Response } from 'express';
// import { TYPES } from '../types';
// import { IUserService } from '../interfaces';
// import { LogDecorator } from '../utils/decorators';

// /**
//  * Controller class for user endpoints
//  */
// @injectable()
// export class UserController {
//   constructor(@inject(TYPES.UserService) private userService: IUserService) {}

//   @LogDecorator.LogMethod()
//   async getUser(req: Request, res: Response) {
//     const user = await this.userService.getUserById(req.user.id);
//     res.json(user);
//   }

//   @LogDecorator.LogMethod()
//   async getAllUsers(req: Request, res: Response) {
//     const users = await this.userService.getAllUsers();
//     res.json(users);
//   }
// }
