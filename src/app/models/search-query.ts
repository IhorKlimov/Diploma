import { Category } from "./category";
import { Difficulty } from "./difficulty";
import { SortOption } from "./sort-option";

export interface SearchQuery {
    selectedCategories?: Category[],
    query?: string,
    sortBy?: SortOption,
    selectedDifficulty?: Difficulty,
}
