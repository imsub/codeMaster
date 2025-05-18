import {inject, injectable} from "inversify";
import {TYPES} from "../types";
import winston from "winston";
import {container} from "../containers/index";
import {CustomError} from "./errors";
import util from "util";
import {createLogger, format, transports} from "winston";
/**
 * Decorator for logging method execution
 */
@injectable()
export class LogDecorator {
  public logger: winston.Logger;
  constructor(@inject(TYPES.Logger) log: winston.Logger) {
    this.logger = log;
    //this.logger = this.logger.bind(this);
  }
  // this.LogMethod()
  static LogMethod(): MethodDecorator {
    return function (
      target: Object,
      propertyKey: string | symbol,
      descriptor: PropertyDescriptor
    ) {
      const originalMethod = descriptor.value;

      descriptor.value = function (...args: any[]) {
        const className = target.constructor.name;
        const methodName = propertyKey.toString();
        const safeStringify = (obj: any): string => {
          return util.inspect(obj, {
            showHidden: false,
            depth: 3,
            colors: false,
          });
        };
        const argsStr = args.map(arg => safeStringify(arg)).join(", ");
        logger.debug(
          `[${className}.${methodName}] Called with args: ${argsStr}`
        );

        const start = Date.now();
        try {
          const result = originalMethod.apply(this, args);
          if (result instanceof Promise) {
            return result
              .then(res => {
                const duration = Date.now() - start;
                logger.debug(
                  `[${className}.${methodName}] Completed in ${duration}ms`
                );
                return res;
              })
              .catch(err => {
                const duration = Date.now() - start;
                logger.error(
                  `[${className}.${methodName}] Failed in ${duration}ms: ${err.message}`
                );
                throw err;
              });
          } else {
            const duration = Date.now() - start;
            logger.debug(
              `[${className}.${methodName}] Completed in ${duration}ms`
            );
            return result;
          }
        } catch (err) {
          const duration = Date.now() - start;
          logger.error(
            `[${className}.${methodName}] Failed in ${duration}ms: ${err}`
          );
          throw err;
        }
      };

      return descriptor;
    };
  }
}

export const logger = createLogger({
  level: "debug",
  format: format.combine(
    format.timestamp(),
    format.printf(({level, message, timestamp}) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [new transports.Console()],
});

// export function LogMethod(): MethodDecorator {
//   return function (
//     target: Object,
//     propertyKey: string | symbol,
//     descriptor: PropertyDescriptor
//   ) {
//     const originalMethod = descriptor.value;

//     descriptor.value = function (...args: any[]) {
//       const className = target.constructor.name;
//       const methodName = propertyKey.toString();
//       const argsStr = args.map(arg => JSON.stringify(arg)).join(', ');

//       logger.debug(`[${className}.${methodName}] Called with args: ${argsStr}`);

//       const start = Date.now();
//       try {
//         const result = originalMethod.apply(this, args);
//         if (result instanceof Promise) {
//           return result
//             .then(res => {
//               const duration = Date.now() - start;
//               logger.debug(`[${className}.${methodName}] Completed in ${duration}ms`);
//               return res;
//             })
//             .catch(err => {
//               const duration = Date.now() - start;
//               logger.error(`[${className}.${methodName}] Failed in ${duration}ms: ${err}`);
//               throw err;
//             });
//         } else {
//           const duration = Date.now() - start;
//           logger.debug(`[${className}.${methodName}] Completed in ${duration}ms`);
//           return result;
//         }
//       } catch (err) {
//         const duration = Date.now() - start;
//         logger.error(`[${className}.${methodName}] Failed in ${duration}ms: ${err}`);
//         throw err;
//       }
//     };

//     return descriptor;
//   };
// }
