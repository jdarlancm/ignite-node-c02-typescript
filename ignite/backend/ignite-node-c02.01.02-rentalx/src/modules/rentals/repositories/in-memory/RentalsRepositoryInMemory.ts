import { ICreateRentalDTO } from "../../dtos/ICreateRentalDTO";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../IRentalsRepository";

class RentalsRepositoryInMemory implements IRentalsRepository {
    rentals: Rental[] = [];

    async create({id, car_id, user_id, expected_return_date, end_date, total}: ICreateRentalDTO): Promise<Rental> {
        const rental = new Rental();
        
        Object.assign(rental,{
            id,
            car_id,
            user_id,
            expected_return_date,
            start_date: new Date(),
            end_date,
            total
        });

        this.rentals.push(rental);

        return rental;
    }

    async findById(id: any): Promise<Rental> {
        return this.rentals.find(rental => rental.id === id);
    }

    async findByUser(user_id: string): Promise<Rental[]> {
        return this.rentals.filter(rental => rental.user_id === user_id);
    }

    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        return this.rentals.find(rental => rental.car_id === car_id && !rental.end_date);
    }

    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        return this.rentals.find(rental => rental.user_id === user_id && !rental.end_date);
    }

}

export { RentalsRepositoryInMemory}