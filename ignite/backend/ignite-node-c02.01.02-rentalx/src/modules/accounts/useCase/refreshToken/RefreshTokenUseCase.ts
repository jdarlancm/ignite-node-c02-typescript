import { verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { sign } from "jsonwebtoken";

import auth from "../../../../config/auth";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";

interface IPayload {
    sub: string;
    email: string;
}

interface ITokenResponse {
    token: string;
    refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
    
    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DateProvider")
        private dateProvider: IDateProvider,
    ) {}
    
    async execute(token: string): Promise<ITokenResponse> {
        const {secret_refresh_token, expires_refresh_token_days, expires_in_refresh_token} = auth;

        const {email, sub} = verify(token, secret_refresh_token) as IPayload;
        
        const user_id = sub;

        const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(user_id, token);

        if(!userToken) {
            throw new AppError("Refresh Token does not exists!");
        }

        console.log(userToken.id);
        await this.usersTokensRepository.deleteById(userToken.id);

        const expires_date = this.dateProvider.addDays(expires_refresh_token_days)

        const refresh_token = sign({email}, secret_refresh_token, {
            subject: sub,
            expiresIn: expires_in_refresh_token,
        });

        await this.usersTokensRepository.create({
            user_id,
            refresh_token,
            expires_date,
        });

        const newToken = sign({}, auth.secret_token, {
            subject: user_id,
            expiresIn: auth.expires_in_token,
        });

        return {refresh_token, token: newToken};

    }
}

export { RefreshTokenUseCase }