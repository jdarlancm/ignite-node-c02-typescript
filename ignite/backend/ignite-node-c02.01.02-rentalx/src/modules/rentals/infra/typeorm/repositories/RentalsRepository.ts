import { IsNull, Repository } from "typeorm";
import { AppDataSource } from "../../../../../shared/infra/typeorm";
import { ICreateRentalDTO } from "../../../dtos/ICreateRentalDTO";
import { IRentalsRepository } from "../../../repositories/IRentalsRepository";
import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rental>;

    constructor() {
        this.repository = AppDataSource.getRepository(Rental);
    }

    async create({id, car_id, expected_return_date, user_id, end_date, total}: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({id, car_id, expected_return_date, user_id, end_date, total});
        await this.repository.save(rental);
        return rental;
    }

    async findById(id: any): Promise<Rental> {
        const rental = this.repository.findOneBy({id});
        return rental;
    }

    async findByUser(user_id: string): Promise<Rental[]> {
        const rentals = this.repository.find({
            where: {user_id}, 
            relations: ["car"],
        });
        return rentals;
    }

    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        const openByCar = await this.repository.findOneBy({car_id, end_date: IsNull()});
        return openByCar;
    }

    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        const openByUser = await this.repository.findOneBy({user_id, end_date: IsNull()});
        return openByUser;
    }
    
}

export { RentalsRepository }