import { Component, Input } from '@angular/core';
import { Recipe } from '../../interfaces/recipe';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { NgIf } from '@angular/common';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-feed-recipe',
  standalone: true,
  imports: [RouterLink, ButtonModule, NgIf, RippleModule,],
  templateUrl: './feed-recipe.component.html',
  styleUrl: './feed-recipe.component.css'
})
export class FeedRecipeComponent {
  @Input()
  recipe!: Recipe;

  @Input()
  showEdit: boolean = false;
}
