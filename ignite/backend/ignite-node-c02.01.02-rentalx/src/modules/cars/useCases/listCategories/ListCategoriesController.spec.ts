import request from 'supertest';
import { hash } from 'bcrypt';
import {v4 as uuidV4 } from 'uuid';

import { app } from '../../../../shared/infra/http/app';
import { AppDataSource } from '../../../../shared/infra/typeorm';
import { DataSource } from 'typeorm';

let dataSource: DataSource;

describe("List Category Controller", () => {
    
    beforeEach(async () => {
        dataSource = AppDataSource;

        const id = uuidV4();
        const password = await hash("admin",8);
    
        dataSource.initialize().then(async () => await dataSource.query(
             `INSERT INTO USERS(id, name, email, password, "isAdmin", driver_license, created_at)
              values('${id}','admin', 'admin@rentx.com.br', '${password}', 'true', 'ABR-123', now())`
        ))
        .catch((error) => console.log(error));

    });

    afterAll(async () => {
        //dataSource.dropDatabase();
        await dataSource.destroy();
    })

    it("should be able to list all cateogry",async () => {
        const responseToken = await request(app)
        .post("/sessions")
        .send({
            "email": "admin@rentx.com.br",
            "password": "admin"
        });

        const {token} = responseToken.body;

        await request(app)
        .post("/categories")
        .send({
            name: "Supertest",
            description: "Supertest"
        }).set({
            Authorization: `Bearer ${token}`
        });

        const response = await request(app)
        .get("/categories").set({
            Authorization: `Bearer ${token}`
        });
        
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0]).toHaveProperty("id");
        expect(response.body[0].name).toEqual("Supertest");
    });

    
});