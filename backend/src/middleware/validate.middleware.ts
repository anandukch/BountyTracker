import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/http.exceptions";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import ValidationException from "../exceptions/validationException";

const validationMiddleware = (dto: any) => {
    return async (req: Request, _: Response, next: NextFunction) => {
        try {
            const schema = plainToInstance(dto, req.body);
            const errors = await validate(schema);
            if (errors.length) {
                throw new ValidationException(400, "Validation Failed", errors);
            }
            next();
        } catch (error) {
            next(error);
        }
    };
};

export default validationMiddleware;