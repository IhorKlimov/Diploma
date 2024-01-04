import { Author } from "./author";

export interface Recipe {
    _id: string,
    title: string,
    imageUrl: string,
    description: string,
    author: Author
}
