import "reflect-metadata";
import { DataSource } from "typeorm";
import { Vehicle } from "../entities/Vehicle";
import { Admin } from "../entities/Admin";


export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: Number( 3306),
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASS! || "root",
    database: process.env.DB_NAME || "vehicle_db",
    synchronize: true,
    logging: false,
    entities: [Vehicle, Admin],
});