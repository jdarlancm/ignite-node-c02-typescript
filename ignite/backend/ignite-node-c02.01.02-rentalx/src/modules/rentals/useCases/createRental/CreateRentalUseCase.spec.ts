import dayjs from "dayjs";
import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../../cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
    const dayAdd24Hours = dayjs().add(24,"hour").toDate();

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, carsRepositoryInMemory, dayjsDateProvider);
    });

    it("shoud be albe to create a new rental", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "test",
            description: "Car test",
            daily_rate: 100,
            license_plate: "test",
            fine_amount: 40,
            category_id: "12344",
            brand: "test"
        });
        
        const rental = await createRentalUseCase.execute({
            user_id: "12345",
            car_id: car.id,
            date_expected_return: dayAdd24Hours,
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("shoud not be albe to create a new rental if there is another open to the same user", async () => {
        await rentalsRepositoryInMemory.create({
            user_id: "12345",
            car_id: "1111",
            expected_return_date: dayAdd24Hours
        });

        await expect(
            createRentalUseCase.execute({
                user_id: "12345",
                car_id: "121212",
                date_expected_return: dayAdd24Hours,
            })
        ).rejects.toEqual(new AppError("there's a rental in progress for user."));

    });

    it("shoud not be albe to create a new rental if there is another open to the same car", async () => {
        await createRentalUseCase.execute({
            user_id: "12345",
            car_id: "121212",
            date_expected_return: dayAdd24Hours,
        });

        await expect(
            createRentalUseCase.execute({
                user_id: "12367",
                car_id: "121212",
                date_expected_return: dayAdd24Hours,
            })
        ).rejects.toEqual(new AppError("Car is unavailable"));

    });

    it("shoud not be albe to create a new rental with invalid return time", async () => {
        
        await expect(
            createRentalUseCase.execute({
                user_id: "12367",
                car_id: "121212",
                date_expected_return: dayjs().toDate(),
            })
        ).rejects.toEqual(new AppError("Invalid return time."));

    });

});