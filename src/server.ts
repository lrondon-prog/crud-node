import "reflect-metadata";

import express from "express";

import { DataSource } from "typeorm";
import { CreateCategories1659014867657 } from "./database/migrations/1659014867657-CreateCategories";
import { CreateVideos1659024734517 } from "./database/migrations/1659024734517-CreateVideos";

import { Category } from "./entities/Category";
import { Video } from "./entities/Video";
import { routes } from "./routes";

const app = express();

app.use(express.json());

app.use(routes);

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "123",
    database: "code_drops_crud",
    synchronize: true,
    logging: true,
    entities: [Category, Video],
    migrations: [CreateCategories1659014867657, CreateVideos1659024734517]
})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })



app.listen(3000, () => console.log("Server is running"));



