import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie, Movies } from '../../models/movie.model';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  movieList: Movie[];
  movieDetail: Movie;
  constructor(
    private MovieService: MovieService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.MovieService.getMovies().subscribe((response) => {
      this.movieList = response.movies;
      const movieId = this.route.snapshot.url[1].path;
      this.movieDetail = this.movieList.filter((e) => e.id === movieId)[0];
      if (this.MovieService.review?.[this.movieDetail.id] === true) {
        this.movieDetail.status = 'Liked';
      } else if (this.MovieService.review?.[this.movieDetail.id] === false) {
        this.movieDetail.status = 'Disliked';
      }
    });
  }
  review(ispositive: boolean): void {
    this.MovieService.setReview(this.movieDetail, ispositive);
    this.movieDetail.status = ispositive ? 'Liked' : 'Disliked';
  }
}
