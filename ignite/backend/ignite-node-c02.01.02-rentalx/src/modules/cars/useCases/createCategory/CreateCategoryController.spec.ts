import request from 'supertest';
import { hash } from 'bcrypt';
import {v4 as uuidV4 } from 'uuid';

import { app } from '../../../../shared/infra/http/app';
import { AppDataSource } from '../../../../shared/infra/typeorm';
import { DataSource } from 'typeorm';

let dataSource: DataSource;

describe("Create Category Controller", () => {
    
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
        dataSource.destroy();
    })

    it("should be able to create a new cateogry",async () => {
        const responseToken = await request(app)
        .post("/sessions")
        .send({
            "email": "admin@rentx.com.br",
            "password": "admin"
        });

        const {token} = responseToken.body;

        const response = await request(app)
        .post("/categories")
        .send({
            name: "Supertest",
            description: "Supertest"
        }).set({
            Authorization: `Bearer ${token}`
        });
        
        expect(response.status).toBe(201);
    });

    it("should not be able to create a new cateogry with name exists",async () => {
        const responseToken = await request(app)
        .post("/sessions")
        .send({
            "email": "admin@rentx.com.br",
            "password": "admin"
        });

        const {token} = responseToken.body;

        const response = await request(app)
        .post("/categories")
        .send({
            name: "Supertest",
            description: "Supertest"
        }).set({
            Authorization: `Bearer ${token}`
        });
        
        expect(response.status).toBe(400);
    });
    
});