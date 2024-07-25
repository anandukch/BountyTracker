import "reflect-metadata";
import { NODE_ENV } from "../utils/constants";
import { config } from "dotenv";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
config();

const dataSource = new DataSource({
	type: "postgres",
	host: process.env.DB_HOST,
	url: process.env.DB_URL,
	port: Number(process.env.DB_PORT),
	database: process.env.DB_NAME,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	extra: { max: 5, min: 2 },
	synchronize: false,
	// ssl: { rejectUnauthorized: false },
	// logging: NODE_ENV == "dev" ? false : true,
	logging: false,
	namingStrategy: new SnakeNamingStrategy(),
	entities: NODE_ENV == "dev" ? ["src/entity/*.ts"] : ["dist/entity/*.js"],
	migrations: ["dist/db/migrations/*.js"],
});

export default dataSource;
