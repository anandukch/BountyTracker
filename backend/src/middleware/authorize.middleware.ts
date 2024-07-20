import { NextFunction, Response } from "express";
import { RequestWithRole } from "../utils/requestWithRole";
import jsonwebtoken from "jsonwebtoken";
import { JWT_SECRET } from "../utils/constants";
import { jwtPayload } from "../utils/jwtPayload.type";
import HttpException from "../exceptions/http.exceptions";
const authorize = async (req: RequestWithRole, res: Response, next: NextFunction) => {
	try {
		const token = getTokenFromRequestHeader(req);
		if (!token) {
			throw new HttpException(403, "Please login before continuing");
		}
		const payload = jsonwebtoken.verify(token, JWT_SECRET);
		req.name = (payload as jwtPayload).name;
		req.email = (payload as jwtPayload).email;
		req.role = (payload as jwtPayload).role;
		const role = req.role;
		return next();
	} catch (error) {
		return next(error);
	}
};
const getTokenFromRequestHeader = (req: RequestWithRole) => {
	const bearerToken = req.header("Authorization");
	const token = bearerToken ? bearerToken.replace("Bearer ", "") : "";
	return token;
};
export default authorize;
