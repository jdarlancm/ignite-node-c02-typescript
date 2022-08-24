import { Repository } from "typeorm";
import { AppDataSource } from "../../../../../shared/infra/typeorm";
import { ICategoriesRepository, ICreateCateoryDTO } from "../../../repositories/ICategoriesRepository";
import { Category } from "../entities/Category";


class CategoriesRepository implements ICategoriesRepository {

    private repository: Repository<Category>;

    //Constructor
    constructor() {
        this.repository = AppDataSource.getRepository(Category);
    }

    //Method
    async create({ name, description }: ICreateCateoryDTO): Promise<void> {
        const category = this.repository.create({
            description,
            name,
        });

        await this.repository.save(category);
    }

    //Method
    async list(): Promise<Category[]> {
        const categories = await this.repository.find();
        return categories;
    }

    //Method
    async findByName(name: string): Promise<Category> {
        
        console.log(this.repository);
        const category = await this.repository.findOneBy({ name });
        return category;
    }
}

export { CategoriesRepository };