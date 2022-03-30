import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movies, Movie } from '../models/movie.model';
import { Observable } from 'rxjs';

const BASE_URL = 'https://wookie.codesubmit.io/movies';

@Injectable({ providedIn: 'root' })
export class MovieService {
  constructor(private http: HttpClient) {}

  sharedData: Movie[];
  isFiltered: boolean;
  review: Record<string, boolean>;

  getMovies(searchQuery: string = ''): Observable<Movies> {
    let url = '';
    if (searchQuery) {
      this.isFiltered = true;
      url = `${BASE_URL}` + '?q=' + searchQuery;
    } else {
      this.isFiltered = false;
      url = `${BASE_URL}`;
    }
    return this.http.get<Movies>(url);
  }

  setReview(movie: Movie, reviewVal: boolean) {
    this.review = {...this.review, [movie.id]: reviewVal}
  }


}
