// import { injectable, inject } from 'inversify';
// import { Router } from 'express';
// import { TYPES } from '../../types';
// import { UserController } from '../../controllers/user.controller';
// import { AsyncHandler } from '../../utils/asyncHandler';
// import { AuthMiddleware } from '../../middlewares/auth.middleware';
// import { RoleMiddleware } from '../../middlewares/role.middleware';

// /**
//  * Class for defining user routes
//  */
// @injectable()
// export class UserRoutes {
//   private router: Router;

//   constructor(
//     @inject(TYPES.UserController) private userController: UserController,
//     @inject(TYPES.AuthMiddleware) private authMiddleware: AuthMiddleware,
//     @inject(TYPES.RoleMiddleware) private roleMiddleware: RoleMiddleware,
//     @inject(TYPES.AsyncHandler) private asyncHandler: AsyncHandler
//   ) {
//     this.router = Router();
//     this.setupRoutes();
//   }

//   private setupRoutes() {
//     this.router.get(
//       '/me',
//       this.authMiddleware.authenticate(),
//       this.asyncHandler.handle(
//         this.userController.getUser.bind(this.userController)
//       )
//     );
//     this.router.get(
//       '/',
//       this.authMiddleware.authenticate(),
//       this.roleMiddleware.authorize(['ADMIN']),
//       this.asyncHandler.handle(
//         this.userController.getAllUsers.bind(this.userController)
//       )
//     );
//   }

//   getRouter(): Router {
//     return this.router;
//   }
// }
