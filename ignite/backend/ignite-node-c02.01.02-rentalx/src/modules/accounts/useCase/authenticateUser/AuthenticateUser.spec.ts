import { AppError } from "../../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {

    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    })

    it("Should be able authenticate an user", async () => {
        const user: ICreateUserDTO = {
            name: "Darlan",
            password: "1234",
            email: "jdarlan@teste.com.br",
            driver_license: "9876543"
        }

        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({ email: user.email, password: user.password });

        expect(result).toHaveProperty("token");
    });

    it("should not be albe to authenticate an nonexistent user", () => {
        expect(async () => {
            await authenticateUserUseCase.execute({ email: "false@email.com", password: "1234" });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to authenticate with incorrect password", () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                name: "asdasdasd",
                password: "534",
                email: "asdasd@teste.com.br",
                driver_license: "9876543"
            };

            await createUserUseCase.execute(user);

            await authenticateUserUseCase.execute({
                email: "asdasd@teste.com.br",
                password: "incorrectPassword",
            });

        }).rejects.toBeInstanceOf(AppError);
    })
});