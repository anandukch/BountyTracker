import { NextFunction, Response } from "express";
import { RequestWithRole } from "../utils/requestWithRole";
import jsonwebtoken from "jsonwebtoken";
import { JWT_SECRET } from "../utils/constants";
import { jwtPayload } from "../utils/jwtPayload.type";
import HttpException from "../exceptions/http.exceptions";
import { employeeService } from "../routes/employee.routes";
import { Role } from "../utils/role.enum";
// const authorize = async (req: RequestWithRole, res: Response, next: NextFunction) => {
// 	try {
// 		const token = getTokenFromRequestHeader(req);
// 		if (!token) {
// 			throw new HttpException(403, "Please login before continuing");
// 		}
// 		const payload = jsonwebtoken.verify(token, JWT_SECRET);
// 		const employee = await employeeService.getEmployeeByEmail((payload as jwtPayload).email);
// 		if (!employee) {
// 			throw new HttpException(403, "Please login before continuing");
// 		}

// 		req.user = employee;
// 		req.name = (payload as jwtPayload).name;
// 		req.email = (payload as jwtPayload).email;
// 		req.role = (payload as jwtPayload).role;
// 		return next();
// 	} catch (error) {
// 		return next(error);
// 	}
// };
const getTokenFromRequestHeader = (req: RequestWithRole) => {
	const bearerToken = req.header("Authorization");
	const token = bearerToken ? bearerToken.replace("Bearer ", "") : "";
	return token;
};

export const authorize = (roles?: Role[]) => {
	return async (req: RequestWithRole, res: Response, next: NextFunction) => {
		try {
			const token = getTokenFromRequestHeader(req);
			const payload = jsonwebtoken.verify(token, JWT_SECRET);
			const userRole = (payload as jwtPayload).role;
			if (roles != undefined && !roles.includes(userRole)) {
				throw new HttpException(403, "Unauthorized");
			}
			const employee = await employeeService.getEmployeeByEmail((payload as jwtPayload).email);
			if (!employee) {
				throw new HttpException(403, "Please login before continuing");
			}

			req.user = employee;
			req.name = (payload as jwtPayload).name;
			req.email = (payload as jwtPayload).email;
			req.role = (payload as jwtPayload).role;
			return next();
		} catch (error) {
			return next(error);
		}
	};
};
export default authorize;
