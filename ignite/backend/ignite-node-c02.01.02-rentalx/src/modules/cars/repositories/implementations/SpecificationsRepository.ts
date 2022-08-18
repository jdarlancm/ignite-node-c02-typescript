import { Repository } from "typeorm";

import { AppDataSource } from "../../../../database";
import { Specification } from "../../entities/Sepecification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {

    private repository: Repository<Specification>;

    //Constructor
    constructor() {
        this.repository = AppDataSource.getRepository(Specification);
    }

    //Method
    async create({ name, description }: ICreateSpecificationDTO): Promise<void> {

        const specification = this.repository.create({
            description,
            name,
        });

        await this.repository.save(specification);
    }

    //Method
    async list(): Promise<Specification[]> {
        const specifications = await this.repository.find();
        return specifications;
    }

    //Method
    async findByName(name: string): Promise<Specification> {
        const specification = await this.repository.findOneBy({ name });
        return specification;
    }
}

export { SpecificationsRepository }