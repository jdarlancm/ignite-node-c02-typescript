import "reflect-metadata"
import { DataSource, DataSourceOptions } from "typeorm";


const config: DataSourceOptions = {
    "type": "postgres",
    "port": 5433,
    "host": "localhost",
    "username": "postgres",
    "password": "teste123",
    "database": "rentx",
    "migrations": ["./src/shared/infra/typeorm/migrations/*.ts"],
    "entities": ["./src/modules/cars/entities/*.ts", "./src/modules/accounts/entities/*.ts"],
    "logging": true,
    "synchronize": true,
}

const configDocker: DataSourceOptions = {
    "type": "postgres",
    "port": 5432,
    "host": "database",
    "username": "docker",
    "password": "ignite",
    "database": "rentx",
    "migrations": ["./src/shared/infra/typeorm/migrations/*.ts"],
    "logging": true,
    "synchronize": true,
}

export const AppDataSource = new DataSource(config);

AppDataSource.initialize()
    .then(() => console.log("database connected!"))
    .catch((error) => console.log(error));