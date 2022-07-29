import { Category } from "../entities/Category";
import { AppDataSource } from "../server";

type CategoryUpdateRequest = {
    id: string;
    name: string;
    description: string;
};

export class UpdateCategoryService {
    async execute({ id, name, description }: CategoryUpdateRequest) {
        const repo = AppDataSource.getRepository(Category);

        const category = await repo.findOneBy({ id });

        if (!category) {
            return new Error("Category does not exists!");
        }

        category.name = name ? name : category.name;
        category.description = description ? description : category.description;

        await repo.save(category);

        return category;

    }
}