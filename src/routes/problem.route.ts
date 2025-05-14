// import { injectable, inject } from 'inversify';
// import { Router } from 'express';
// import { TYPES } from '../../types';
// import { ProblemController } from '../../controllers/problem.controller';
// import { AsyncHandler } from '../../utils/asyncHandler';
// import { AuthMiddleware } from '../../middlewares/auth.middleware';
// import { RoleMiddleware } from '../../middlewares/role.middleware';

// /**
//  * Class for defining problem routes
//  */
// @injectable()
// export class ProblemRoutes {
//   private router: Router;

//   constructor(
//     @inject(TYPES.ProblemController)
//     private problemController: ProblemController,
//     @inject(TYPES.AuthMiddleware) private authMiddleware: AuthMiddleware,
//     @inject(TYPES.RoleMiddleware) private roleMiddleware: RoleMiddleware,
//     @inject(TYPES.AsyncHandler) private asyncHandler: AsyncHandler
//   ) {
//     this.router = Router();
//     this.setupRoutes();
//   }

//   private setupRoutes() {
//     this.router.post(
//       '/',
//       this.authMiddleware.authenticate(),
//       this.roleMiddleware.authorize(['ADMIN']),
//       this.asyncHandler.handle(
//         this.problemController.createProblem.bind(this.problemController)
//       )
//     );
//     this.router.get(
//       '/:id',
//       this.asyncHandler.handle(
//         this.problemController.getProblem.bind(this.problemController)
//       )
//     );
//   }

//   getRouter(): Router {
//     return this.router;
//   }
// }
