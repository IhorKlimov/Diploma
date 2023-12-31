import { Author } from "./author";

export interface Review {
    id: number,
    author: Author,
    text: string,
    stars: number,
    timestamp: number
}
