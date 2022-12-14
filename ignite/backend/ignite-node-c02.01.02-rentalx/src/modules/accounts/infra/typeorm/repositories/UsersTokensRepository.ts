import { Repository } from "typeorm";
import { AppDataSource } from "../../../../../shared/infra/typeorm";
import { ICreateUserTokenDTO } from "../../../dtos/ICreateUserTokenDTO";
import { IUsersTokensRepository } from "../../../repositories/IUsersTokensRepository";
import { UserTokens } from "../entities/UserTokens";

class UsersTokensRepository implements IUsersTokensRepository {
    
    private repository: Repository<UserTokens>;

    constructor() {
        this.repository = AppDataSource.getRepository(UserTokens);
    }

    async create({ user_id, refresh_token, expires_date }: ICreateUserTokenDTO): Promise<UserTokens> {
        const userToken = this.repository.create({
            user_id, refresh_token, expires_date
        });

        await this.repository.save(userToken);
        return userToken;
    }

    async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens> {
        const userToken = await this.repository.findOneBy({user_id, refresh_token});
        return userToken;
    }

    async deleteById(id: string) {
        await this.repository.delete(id);
    }

    async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
        const userToken = await this.repository.findOneBy({refresh_token});
        return userToken;
    }
}


export {UsersTokensRepository}