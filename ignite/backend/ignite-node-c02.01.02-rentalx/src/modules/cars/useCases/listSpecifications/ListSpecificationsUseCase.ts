import { inject, injectable } from "tsyringe";
import { Specification } from "../../infra/typeorm/entities/Sepecification";
import { SpecificationsRepository } from "../../infra/typeorm/repositories/SpecificationsRepository";

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