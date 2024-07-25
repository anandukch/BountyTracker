import { NextFunction, Request, Response } from "express";
import { ValidationError } from "class-validator";
import HttpException from "../exceptions/http.exceptions";
import ValidationException from "../exceptions/validationException";

const formatValidationError = (errors: ValidationError[]): string[] => {
	let errorMessages = [];
	for (let error of errors) {
		if (error.children.length) {
			errorMessages.push(...formatValidationError(error.children));
		}
		if (error.constraints) {
			Object.values(error.constraints).forEach((message) => {
				errorMessages.push(message);
			});
		}
	}
	return errorMessages;
};

const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
	try {
		if (error instanceof HttpException) {
			const status: number = error.status || 500;
			const message: string = error.message || "Something went wrong";
			let resbody = { message: message };
			res.status(status).send(resbody);
		} else if (error instanceof ValidationException) {
			const status: number = error.status || 400;
			const message: string = error.message || "Something went wrong";
			const errorMessages = formatValidationError(error.errors);
			let resbody = { message: message, error: errorMessages };
			res.status(status).json(resbody);
		} else {
			res.status(500).send({ error: error.message });
		}
	} catch (error) {
		next(error);
	}
};

export default errorMiddleware;
