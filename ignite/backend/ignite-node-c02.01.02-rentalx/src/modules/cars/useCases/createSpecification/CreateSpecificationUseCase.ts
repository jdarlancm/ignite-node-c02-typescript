import { inject, injectable } from "tsyringe";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject("SpecificationsRepository")
        private specificationRepository: ISpecificationsRepository
    ) { }

    async execute({ name, description }: IRequest): Promise<void> {
        const specificationAlreadExists = await this.specificationRepository.findByName(name);

        if (specificationAlreadExists) {
            throw new Error("Specification already exists!");
        }

        this.specificationRepository.create({ name, description });
    }
}


export { CreateSpecificationUseCase }