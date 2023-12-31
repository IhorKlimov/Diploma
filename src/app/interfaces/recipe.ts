import { Author } from "./author";

export interface Recipe {
    id: string,
    title: string,
    imageUrl: string,
    description: string,
    author: Author
}
