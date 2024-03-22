import { Author } from "./author";

export interface Review {
    id: number,
    user: Author,
    text: string,
    stars: number,
    timestamp: number
}
