import "reflect-metadata"
import { DataSource, DataSourceOptions } from "typeorm";


const config: DataSourceOptions = {
    "type": "postgres",
    "port": 49153,
    "host": "localhost",
    "username": "postgres",
    "password": "postgrespw",
    "database": "rentx",
    "migrations": ["./src/shared/infra/typeorm/migrations/*.ts"],
    "entities": ["./src/modules/cars/infra/typeorm/entities/*.ts", "./src/modules/accounts/infra/typeorm/entities/*.ts"],
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