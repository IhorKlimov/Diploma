import { Category } from "./category";
import { Difficulty } from "./difficulty";

export interface SearchQuery {
    selectedCategories?: Category[],
    query?: string,
    selectedDifficulty?: Difficulty,
}
