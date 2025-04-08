import { Request, Response, NextFunction } from 'express';

export interface CustomError extends Error {
    status?: number;
    stack?: string;
  }  

  const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
  
    res.status(err.status || 500).json({
      message: err.message || 'Internal Server Error',
      status: err.status || 500,
    });
  };
  

export default errorHandler;
