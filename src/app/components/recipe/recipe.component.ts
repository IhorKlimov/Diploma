import { Component, Input } from '@angular/core';
import { Recipe } from '../../interfaces/recipe';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { DatePipe, NgFor } from '@angular/common';
import { ReviewComponent } from '../review/review.component';
import { Review } from '../../interfaces/review';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { Author } from '../../interfaces/author';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [RatingModule, FormsModule, NgFor, ReviewComponent, InputTextModule, ButtonModule, AvatarModule],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})
export class RecipeComponent {

  @Input()
  id!: string
  selectedRating!: number;
  reviewText!: string;

  constructor(private recipeService: RecipeService) { }

  currentUser: Author = {
    _id: "1",
    imageUrl: "https://randomuser.me/api/portraits/men/72.jpg",
    userName: "John Smith",
    email: "wef@wef.wef"
  }

  recipe!: Recipe;

  ngOnInit() {
    this.recipeService.getRecipe(this.id).subscribe(data => this.recipe = data);
  }

  reviews: Review[] = [
    {
      id: 1,
      timestamp: 1700884443000,
      author: {
        _id: "1",
        imageUrl: "https://randomuser.me/api/portraits/men/72.jpg",
        userName: "John Smith",
        email: "wef@wef.wef"
      },
      stars: 4,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
      id: 1,
      timestamp: 1700884443000,
      author: {
        _id: "1",
        imageUrl: "https://randomuser.me/api/portraits/men/72.jpg",
        userName: "John Smith",
        email: "wef@wef.wef"
      },
      stars: 4,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
      id: 1,
      timestamp: 1700884443000,
      author: {
        _id: "1",
        imageUrl: "https://randomuser.me/api/portraits/men/72.jpg",
        userName: "John Smith",
        email: "wef@wef.wef"
      },
      stars: 4,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
      id: 1,
      timestamp: 1700884443000,
      author: {
        _id: "1",
        imageUrl: "https://randomuser.me/api/portraits/men/72.jpg",
        userName: "John Smith",
        email: "wef@wef.wef"
      },
      stars: 4,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
      id: 1,
      timestamp: 1700884443000,
      author: {
        _id: "1",
        imageUrl: "https://randomuser.me/api/portraits/men/72.jpg",
        userName: "John Smith",
        email: "wef@wef.wef"
      },
      stars: 4,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }

  ]

}
