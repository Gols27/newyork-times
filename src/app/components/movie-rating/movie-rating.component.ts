import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-movie-rating',
  templateUrl: './movie-rating.component.html',
  styleUrls: ['./movie-rating.component.scss']
})
export class MovieRatingComponent implements OnInit {
  @Input() rating: number;
  stars = [1, 2, 3, 4, 5];

  public ratingCount: number;

  constructor() {
    this.ratingCount = 0;
  }

  ngOnInit() {
    this.rating = this.rating * 5;
    this.ratingCount = Math.round(this.rating / 10);
  }

}
