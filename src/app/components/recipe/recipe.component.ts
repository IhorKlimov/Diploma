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

  currentUser: Author = {
    id: 1,
    imageUrl: "https://randomuser.me/api/portraits/men/72.jpg",
    name: "Steve Daniells"
  }

  recipe: Recipe = {
    author: {
      id: 1,
      imageUrl: "https://randomuser.me/api/portraits/men/72.jpg",
      name: "John Smith"
    },
    _id: "10",
    title: "Mango Tango Smoothie",
    imageUrl: "data:image/jpeg;base64,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",
    description: "Dance to the beat of tropical flavors with the Mango Tango Smoothie. Blended with ripe mangoes, yogurt, and a splash of citrus, this refreshing smoothie is a delightful way to start your day or cool off in the afternoon."
  }

  reviews: Review[] = [
    {
      id: 1,
      timestamp: 1700884443000,
      author: {
        id: 1,
        imageUrl: "https://randomuser.me/api/portraits/men/72.jpg",
        name: "John Smith"
      },
      stars: 4,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
      id: 1,
      timestamp: 1700884443000,
      author: {
        id: 1,
        imageUrl: "https://randomuser.me/api/portraits/men/72.jpg",
        name: "John Smith"
      },
      stars: 4,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
      id: 1,
      timestamp: 1700884443000,
      author: {
        id: 1,
        imageUrl: "https://randomuser.me/api/portraits/men/72.jpg",
        name: "John Smith"
      },
      stars: 4,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
      id: 1,
      timestamp: 1700884443000,
      author: {
        id: 1,
        imageUrl: "https://randomuser.me/api/portraits/men/72.jpg",
        name: "John Smith"
      },
      stars: 4,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
      id: 1,
      timestamp: 1700884443000,
      author: {
        id: 1,
        imageUrl: "https://randomuser.me/api/portraits/men/72.jpg",
        name: "John Smith"
      },
      stars: 4,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }

  ]

}
