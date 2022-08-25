import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository{

    cars: Car[] = [];

    async create({
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
        specifications
    }: ICreateCarDTO): Promise<Car> {
        
        const car = new Car();
        
        Object.assign(car, {
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
            specifications
        });

        this.cars.push(car);

        return car;
        
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.cars.find(car => car.license_plate === license_plate);
    }
    
    async findAvailable(
        category_id?:string,
        name?: string,
        brand?: string
    ): Promise<Car[]> {

        const all = this.cars.filter(car => {
            if(car.available === true && ( 
                    (category_id && car.category_id === category_id) || 
                    (name && car.name === name) ||
                    (brand && car.brand === brand) ||
                    (!category_id && !name && !brand)
                )
            )  {
                return car;
            }
            return null;
        });

        return all;
    }

    async findById(id: string): Promise<Car> {
        return this.cars.find(car => car.id === id);
    }

}

export {CarsRepositoryInMemory}