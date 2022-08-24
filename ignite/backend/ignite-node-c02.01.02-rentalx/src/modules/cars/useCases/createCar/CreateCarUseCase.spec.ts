import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase"

let createCarUserCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
    
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUserCase = new CreateCarUseCase(carsRepositoryInMemory);
    });

    it("shoude be able to create a new car", async () => {
        const car = await createCarUserCase.execute({
            name: "Name car", 
            description: "Description car",
            daily_rate: 100, 
            license_plate: "ABC-123", 
            fine_amount: 60, 
            brand: "Brand", 
            category_id: "category"
        });

        expect(car).toHaveProperty("id");
    });

    it("should not be able to create a new car with exists license plate", async () => {
        expect(async () => {
            await createCarUserCase.execute({
                name: "Name car 1", 
                description: "Description car",
                daily_rate: 100, 
                license_plate: "ABC-123", 
                fine_amount: 60, 
                brand: "Brand", 
                category_id: "category"
            });

            await createCarUserCase.execute({
                name: "Name car 2", 
                description: "Description car",
                daily_rate: 100, 
                license_plate: "ABC-123", 
                fine_amount: 60, 
                brand: "Brand", 
                category_id: "category"
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should be able to create a new car with available true by default", async () => {
        const car = await createCarUserCase.execute({
            name: "Car Available", 
            description: "Description car",
            daily_rate: 100, 
            license_plate: "ABC-123", 
            fine_amount: 60, 
            brand: "Brand", 
            category_id: "category"
        });
        console.log(car);

        expect(car.available).toBe(true);
    });
})