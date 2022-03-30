import { Component, DoCheck, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit, DoCheck {
  movieList: Movie[];
  genreList: string[];
  isFiltered: boolean;

  constructor(private MovieService: MovieService) {}
  ngDoCheck(): void {
    this.isFiltered = this.MovieService.isFiltered;
    this.movieList = this.MovieService.sharedData;
  }

  ngOnInit(): void {
    this.MovieService.getMovies().subscribe((response) => {
      this.genreList = this.getAllGenres(response.movies);
      const sortResponse = response.movies.sort((a, b) => {
        const nameA = a.title.toUpperCase();
        const nameB = b.title.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      this.MovieService.sharedData = sortResponse;
      this.movieList = this.MovieService.sharedData;

      this.movieList.forEach(movie => {
        if(this.MovieService.review?.[movie.id] === true) {
          movie.status = 'Liked';
        } else if(this.MovieService.review?.[movie.id] === false) {
          movie.status = 'Disliked'
        }
      }
      );
    });
  }

  getAllGenres(movieList) {
    let genreList = [];
    movieList.forEach((movie) => {
      genreList = Array.from(new Set(genreList.concat(movie.genres)));
    });
    return genreList;
  }
}
