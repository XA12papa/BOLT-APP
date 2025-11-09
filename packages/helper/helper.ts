import type { NextFunction, Request, Response } from 'express';


class ApiResponse {
    statusCode : number;
    data : any;
    success : boolean;
    message : string;
    constructor(statusCode : number,data : any,message="success"){
        this.statusCode = statusCode;
        this.data = data;
        this.success = statusCode < 400;
        this.message = message;
    }
}

class ApiError extends Error {
    statusCode : number;
    success : boolean;
    errors : [] | any;
    constructor(statusCode : number,message="Something went wrong",errors : [] | any = [],stack = ""){
        super(message);
        this.statusCode = statusCode;
        this.success = false;
        this.message = message;
        this.errors = errors;


        if(stack){
            this.stack = stack;
        }
        else{
            Error.captureStackTrace(this,this.constructor);
        }
    }
}


type RequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<void> | void;

const asyncHandler = (requestHandler: RequestHandler) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await Promise.resolve(requestHandler(req, res, next));
        } catch (err) {
            next(err);
        }
    }
}



export {
    ApiResponse,
    ApiError,
    asyncHandler
};