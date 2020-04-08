import { Middleware, ExpressMiddlewareInterface } from "routing-controllers";
import { Request, Response } from "express";

@Middleware({ type: "before" })
export class LoggingMiddleware implements ExpressMiddlewareInterface {
  use(request: Request, response: Response, next: (err?: any) => any): void {
    console.log("do something...");
    next();
  }
}
