import { Router } from "express";
import { CreateUserController } from "../modules/accounts/useCase/createUser/CreateUserController";

const usersRoutes = Router();

const createUserControle = new CreateUserController();

usersRoutes.post("/", createUserControle.handle);

export { usersRoutes };