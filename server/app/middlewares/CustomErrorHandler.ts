import {
  Middleware,
  ExpressErrorMiddlewareInterface,
} from "routing-controllers";
import { Request, Response } from "express";

@Middleware({ type: "after" })
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
  error(
    error: any,
    request: Request,
    response: Response,
    next: (err?: any) => any
  ) {
    // console.log(error, 333);
    const { httpCode, name, message } = error;
    response.json({
      code: httpCode,
      msg: message,
    });

    next();
  }
}
