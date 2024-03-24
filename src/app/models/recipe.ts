import { Author } from "./author";
import { Category } from "./category";
import { Difficulty } from "./difficulty";

export interface Recipe {
    _id: string,
    title: string,
    updatedTimestamp: number,
    createdTimestamp: number,
    imageUrl: string,
    description: string,
    categories: Category[],
    difficulty: Difficulty,
    author: Author
}
