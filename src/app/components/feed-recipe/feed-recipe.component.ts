import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../../interfaces/recipe';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { NgClass, NgIf } from '@angular/common';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-feed-recipe',
  standalone: true,
  imports: [RouterLink, ButtonModule, NgIf, RippleModule, NgClass,],
  templateUrl: './feed-recipe.component.html',
  styleUrl: './feed-recipe.component.css'
})
export class FeedRecipeComponent {
  @Input()
  recipe!: Recipe;

  @Input()
  showEdit: boolean = false;

  @Input()
  isFavorite: boolean = false;

  @Output()
  onFavoriteClicked = new EventEmitter<string>();

  triggerFavorite() {
    this.onFavoriteClicked.emit(this.recipe._id);
  }
}
