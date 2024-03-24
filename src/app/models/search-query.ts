import { Category } from "./category";

export interface SearchQuery {
    selectedCategories?: Category[],
    query?: string,
}
