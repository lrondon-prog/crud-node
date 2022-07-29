import { Category } from "../entities/Category";
import { Video } from "../entities/Video";
import { AppDataSource } from "../server";

type VideoRequest = {
    name: string;
    description: string;
    duration: number;
    category_id: string;
}

export class CreateVideoService {
    async execute({ name, description, duration, category_id }: VideoRequest): Promise<Error | Video> {
        const repo = AppDataSource.getRepository(Video);

        if (await repo.findOneBy({category_id})) {
            return new Error("Category does not exists!")
        }

        const video = repo.create({ name, description, duration, category_id });

        await repo.save(video);

        return video;
    }
}