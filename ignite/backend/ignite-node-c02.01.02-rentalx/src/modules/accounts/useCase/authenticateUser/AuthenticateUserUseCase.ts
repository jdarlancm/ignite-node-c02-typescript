import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";

import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    },
    token: string;
}

@injectable()
class AuthenticateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRespository: IUsersRepository
    ) { }

    async execute({ email, password }): Promise<IResponse> {
        const user = await this.usersRespository.findByEmail(email);

        if (!user) {
            throw new AppError("E-mail or password incorrect1");
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError("E-mail or password incorrect2");
        }

        const token = sign({}, "c11a2e8b4ff1ca5122ff89a812de46d1", {
            subject: user.id,
            expiresIn: "1d",
        });

        return { user: { name: user.name, email }, token };
    }
}

export { AuthenticateUserUseCase }