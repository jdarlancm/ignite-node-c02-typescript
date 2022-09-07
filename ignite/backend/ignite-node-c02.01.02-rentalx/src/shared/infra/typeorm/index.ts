import "reflect-metadata"
import { DataSource, DataSourceOptions } from "typeorm";


const config: DataSourceOptions = {
    "type": "postgres",
    "port": 5433,
    "host": "localhost",
    "username": "postgres",
    "password": "teste123",
    "database": process.env.NODE_ENV === "test" ? "rentx_test" : "rentx",
    "migrations": ["./src/shared/infra/typeorm/migrations/*.ts"],
    "entities": ["./src/modules/cars/infra/typeorm/entities/*.ts", "./src/modules/accounts/infra/typeorm/entities/*.ts", "./src/modules/rentals/infra/typeorm/entities/*.ts"],
    "logging": true,
    "synchronize": true,
}

const configHome: DataSourceOptions = {
    "type": "postgres",
    "port": 5433,
    "host": "localhost",
    "username": "docker",
    "password": "ignite",
    "database": "rentx",
    "migrations": ["./src/shared/infra/typeorm/migrations/*.ts"],
    "entities": ["./src/modules/cars/infra/typeorm/entities/*.ts", "./src/modules/accounts/infra/typeorm/entities/*.ts", "./src/modules/rentals/infra/typeorm/entities/*.ts"],
    "logging": true,
    "synchronize": true,
}

export const AppDataSource = new DataSource(config);

AppDataSource.initialize()
    .then(() => console.log("database connected!"))
    .catch((error) => console.log(error));