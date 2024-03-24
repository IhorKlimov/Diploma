import { Author } from "./author";
import { Category } from "./category";

export interface Recipe {
    _id: string,
    title: string,
    imageUrl: string,
    description: string,
    categories: Category[],
    author: Author
}
