import { Author } from "./author";
import { Category } from "./category";

export interface Recipe {
    _id: string,
    title: string,
    updatedTimestamp: number,
    createdTimestamp: number,
    imageUrl: string,
    description: string,
    categories: Category[],
    author: Author
}
