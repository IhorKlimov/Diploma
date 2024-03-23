import { Component, Input } from '@angular/core';
import { TimeagoModule } from 'ngx-timeago';
import { AvatarModule } from 'primeng/avatar';
import { RatingModule } from 'primeng/rating';
import { Review } from '../../models/review';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [AvatarModule, TimeagoModule, RatingModule, FormsModule, NgIf,],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {
  @Input()
  review!: Review

}
