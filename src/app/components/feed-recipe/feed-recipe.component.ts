import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../../models/recipe';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { NgClass, NgIf } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { BarRatingModule } from "ngx-bar-rating";
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar, faStarHalfAlt, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-feed-recipe',
  standalone: true,
  imports: [RouterLink, ButtonModule, NgIf, RippleModule, NgClass, BarRatingModule, FontAwesomeModule,],
  templateUrl: './feed-recipe.component.html',
  styleUrl: './feed-recipe.component.css'
})
export class FeedRecipeComponent {
  @Input() recipe!: Recipe;
  @Input() showEdit: boolean = false;
  @Input() isFavorite: boolean = false;
  @Output() onFavoriteClicked = new EventEmitter<string>();

  constructor(
    library: FaIconLibrary
  ) {
    library.addIcons(
      faStar,
      faStarHalfAlt,
      farStar,
      faTimesCircle
    )
  }

  triggerFavorite() {
    this.onFavoriteClicked.emit(this.recipe._id);
  }

  getFormattedCategories() {
    return this.recipe.categories.map(c => c.name).join(', ');
  }
}
