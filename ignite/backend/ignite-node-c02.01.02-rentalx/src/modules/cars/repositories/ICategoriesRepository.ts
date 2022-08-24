import { Category } from "../infra/typeorm/entities/Category";


//DTO - Data Transfer Object
interface ICreateCateoryDTO {
    name: string;
    description: string;
}

interface ICategoriesRepository {
    findByName(name: string): Promise<Category>;
    list(): Promise<Category[]>;
    create({ name, description }: ICreateCateoryDTO): Promise<void>;
}

export { ICategoriesRepository, ICreateCateoryDTO };