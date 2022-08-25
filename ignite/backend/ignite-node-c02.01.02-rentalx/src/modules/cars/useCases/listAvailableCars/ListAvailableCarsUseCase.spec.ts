import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
    })

    it("should be albe to lista all available cars", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "A4", 
            description: "Carrao2", 
            daily_rate: 140.00, 
            license_plate: "ABC-222222", 
            fine_amount: 100, 
            brand: "Audi", 
            category_id: "40295d83-39af-44e3-ad2e-cbf02e9a5ddb"
        });

        const cars = await listAvailableCarsUseCase.execute({});

        expect(cars).toEqual([car]);
    });

    it("should be able to list all avaible cars by brand", async () => {
        const car1 = await carsRepositoryInMemory.create({
            name: "A4", 
            description: "Carrao2", 
            daily_rate: 140.00, 
            license_plate: "ABC-222222", 
            fine_amount: 100, 
            brand: "Audi", 
            category_id: "40295d83-39af-44e3-ad2e-cbf02e9a5ddb"
        });

        const car2 = await carsRepositoryInMemory.create({
            name: "Car 2", 
            description: "asdasdsad", 
            daily_rate: 140.00, 
            license_plate: "ABC-222222", 
            fine_amount: 100, 
            brand: "Car_brand", 
            category_id: "40295d83-39af-44e3-ad2e-cbf02e9a5ddb"
        });

        const cars = await listAvailableCarsUseCase.execute({
            brand: "Car_brand"
        });

        expect(cars).toEqual([car2]);
    });

    it("should be able to list all avaible cars by name", async () => {
        const car1 = await carsRepositoryInMemory.create({
            name: "A4", 
            description: "Carrao2", 
            daily_rate: 140.00, 
            license_plate: "ABC-222222", 
            fine_amount: 100, 
            brand: "Audi", 
            category_id: "40295d83-39af-44e3-ad2e-cbf02e9a5ddb"
        });

        const car2 = await carsRepositoryInMemory.create({
            name: "Car 2", 
            description: "asdasdsad", 
            daily_rate: 140.00, 
            license_plate: "ABC-222222", 
            fine_amount: 100, 
            brand: "Car_brand", 
            category_id: "40295d83-39af-44e3-ad2e-cbf02e9a5ddb"
        });
        
        const cars = await listAvailableCarsUseCase.execute({
            name: "Car 2"
        });

        expect(cars).toEqual([car2]);
    });

    it("should be able to list all avaible cars by category", async () => {
        const car1 = await carsRepositoryInMemory.create({
            name: "A4", 
            description: "Carrao2", 
            daily_rate: 140.00, 
            license_plate: "ABC-222222", 
            fine_amount: 100, 
            brand: "Audi", 
            category_id: "40295d83-39af-44e3-ad2e-cbf02e9a5ddb"
        });

        const car2 = await carsRepositoryInMemory.create({
            name: "Car 2", 
            description: "asdasdsad", 
            daily_rate: 140.00, 
            license_plate: "ABC-222222", 
            fine_amount: 100, 
            brand: "Car_brand", 
            category_id: "12345"
        });
        
        const cars = await listAvailableCarsUseCase.execute({
            category_id: "12345"
        });

        expect(cars).toEqual([car2]);
    });

});