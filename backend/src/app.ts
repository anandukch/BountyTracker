import { Request, Response } from "express";
import express from "express";
import bodyParser from "body-parser";
import { config } from "dotenv";
config();
import { loggerMiddleWare } from "./middleware/logger.middleware";
import dataSource from "./db/dataSource.db";
import errorMiddleware from "./middleware/error.middleware";
import cors from "cors";
import employeeRouter from "./routes/employee.routes";
import taskRouter from "./routes/task.routes";
import authorize from "./middleware/authorize.middleware";
import { Role } from "./utils/role.enum";

const server = express();
server.use(bodyParser.json());
server.use(cors());

server.use(loggerMiddleWare);
server.use("/employees", employeeRouter);
server.use("/tasks", taskRouter);

server.get("/", (req: Request, res: Response) => {
	res.status(200).send("Hello world");
});

server.use(errorMiddleware);

(async () => {
	try {
		await dataSource.initialize();
		console.log("Database connected");
	} catch (e) {
		console.log("Failed", e);
		process.exit(1);
	}
	server.listen(3000, () => {
		console.log("server listening to 3000");
	});
})();
