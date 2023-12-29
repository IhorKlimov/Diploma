import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-feed-recipe',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './feed-recipe.component.html',
  styleUrl: './feed-recipe.component.css'
})
export class FeedRecipeComponent {
  @Input()
  recipe!: Recipe;

}
