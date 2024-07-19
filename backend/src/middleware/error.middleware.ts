import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/http.exceptions";

const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof HttpException) {
        return res.status(err.status).send({ message: err.message, errors: err.errors });
    }
    res.status(500).send({ error: err.message });
};

export default errorMiddleware;
