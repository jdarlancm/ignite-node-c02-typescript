import { In, Repository } from "typeorm";
import { AppDataSource } from "../../../../../shared/infra/typeorm";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../../../repositories/ISpecificationsRepository";
import { Specification } from "../entities/Sepecification";


class SpecificationsRepository implements ISpecificationsRepository {

    private repository: Repository<Specification>;

    //Constructor
    constructor() {
        this.repository = AppDataSource.getRepository(Specification);
    }

    //Method
    async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {

        const specification = this.repository.create({
            description,
            name,
        });

        await this.repository.save(specification);

        return specification;
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

    async findByIds(ids: string[]): Promise<Specification[]> {
        const specifications = await this.repository.findBy({
            id: In(ids)
        });

        return specifications;
    }

}

export { SpecificationsRepository }