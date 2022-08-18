import { inject, injectable } from "tsyringe";
import { Specification } from "../../entities/Sepecification";
import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";

@injectable()
class ListSpecificationsUseCase {
    constructor(
        @inject("SpecificationsRepository")
        private specificationsRepository: SpecificationsRepository
    ) { }

    async execute(): Promise<Specification[]> {
        const specifications = this.specificationsRepository.list();
        return specifications;
    }
}

export { ListSpecificationsUseCase }