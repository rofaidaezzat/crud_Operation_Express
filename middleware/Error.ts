
import type { Request, Response , NextFunction } from "express";

export default class ErrorMiddleware {
    static handle(req:Request,res:Response,next:NextFunction) {
        // if user enter api that not exists
        if(req.originalUrl.startsWith('/api')){
 res.status(500).json({ 
    error:"Internal Server Error",
    message: "Route not found",
    // دي عملاها علشان اظهر الايرور ايه سببه 
    stack: process.env.NODE_ENV === 'development' ? 'error.stack' :null

});

        }
       next();
}
}