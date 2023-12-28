import { Component, Input } from '@angular/core';
import { Recepie } from '../recepie';

@Component({
  selector: 'app-feed-recepie',
  standalone: true,
  imports: [],
  templateUrl: './feed-recepie.component.html',
  styleUrl: './feed-recepie.component.css'
})
export class FeedRecepieComponent {
  @Input()
  recepie!: Recepie;

}
