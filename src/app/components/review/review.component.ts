import { Component, Input } from '@angular/core';
import { Review } from '../../interfaces/review';
import { AvatarModule } from 'primeng/avatar';
import { TimeagoModule } from 'ngx-timeago';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [AvatarModule, TimeagoModule],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {
  @Input()
  review!: Review

}
