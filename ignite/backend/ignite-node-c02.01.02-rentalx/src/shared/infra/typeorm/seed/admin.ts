import { AppDataSource } from "..";
import { v4 as uuidV4 } from "uuid";
import {hash} from "bcrypt";

async function create() {

    const id = uuidV4();
    const password = await hash("admin",8);

    const dataSource = AppDataSource;
    dataSource.initialize().then(async () => await dataSource.query(
        `INSERT INTO USERS(id, name, email, password, "isAdmin", driver_license, created_at)
         values('${id}','admin', 'admin@rentx.com.br', '${password}', 'true', 'ABR-123', now())`
    ))
    .catch((error) => console.log(error));
}

create().then(() => console.log("user admin created"));
