import { Author } from "./author";

export interface Review {
    _id: number,
    user: Author,
    text: string,
    stars: number,
    updatedTimestamp: number,
    createdTimestamp: number,
}
