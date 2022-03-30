import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  searchMovie = new FormControl();
  constructor(private MovieService: MovieService) {}

  onSearch() {
    this.MovieService.getMovies(this.searchMovie.value).subscribe(
      (response) => {
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

        this.MovieService.sharedData.forEach((movie) => {
          if (this.MovieService.review?.[movie.id] === true) {
            movie.status = 'Liked';
          } else if (this.MovieService.review?.[movie.id] === false) {
            movie.status = 'Disliked';
          }
        });
      }
    );
  }
}
