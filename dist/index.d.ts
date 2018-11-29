import { Request, Response, NextFunction } from 'express';
declare function makeValidateBody<T>(c: T, errorHandler?: (err: any, req: Request, res: Response, next: NextFunction) => void): (req: Request, res: Response, next: NextFunction) => void;
export { makeValidateBody };
