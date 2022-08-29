import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "../../repositories/in-memory/SpecificationsRepositoryInMemory";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;


describe("Create Car Specification", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory,specificationsRepositoryInMemory);
    });

    it("should not be able o add a new specifications to a non-existent car", async () => {
        expect(async () => {
            const car_id = "1234";
            const specifications_id = ["54321"];

            await createCarSpecificationUseCase.execute({car_id, specifications_id});
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should be able o add a new specification to the car", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Name car", 
            description: "Description car",
            daily_rate: 100, 
            license_plate: "ABC-123", 
            fine_amount: 60, 
            brand: "Brand", 
            category_id: "category"
        });

        const sepecification = await specificationsRepositoryInMemory.create({
            name: "test",
            description: "test",
        });

        const specifications_id = [sepecification.id];

        const specificationsCars = await createCarSpecificationUseCase.execute({car_id: car.id, specifications_id});
        
        expect(specificationsCars).toHaveProperty("specifications");
        expect(specificationsCars.specifications.length).toBe(1);
    });

})