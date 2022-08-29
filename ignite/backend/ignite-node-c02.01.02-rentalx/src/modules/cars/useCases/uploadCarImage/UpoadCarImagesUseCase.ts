import { inject, injectable } from "tsyringe";
import { ICarsImagesRepository } from "../../repositories/ICarsImagesRepository";

interface IRequest {
    car_id: string;
    images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
    constructor(
        @inject("CarsImageRepository")
        private carsImagesrepository: ICarsImagesRepository
    ) {}

    async execute({car_id, images_name}: IRequest) {
        images_name.map(async (image) => {
            await this.carsImagesrepository.create(car_id, image);
        });
    }
}

export { UploadCarImagesUseCase }