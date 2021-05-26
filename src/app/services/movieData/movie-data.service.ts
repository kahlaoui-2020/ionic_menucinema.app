import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from '../../../environments/environment';
import { MovieResponse } from '../../models/tmdb-data/Movie';
import { TmdbService } from '../tmdb.service';

@Injectable({
    providedIn: 'root'
})
export class MovieDataService {

    private currentMovie: MovieResponse;
    private indexMovies = 1;

    constructor(private tmb: TmdbService, private afs: AngularFirestore) {
        this.tmb.init(environment.key);
    }

    // returns movies for house
    async getMoviesMaison(): Promise<MovieResponse[]> {
        const results: MovieResponse[] = [];
        this.tmb.getMoviesByList(this.indexMovies).then((theMovies) => {
            if (theMovies.hasOwnProperty('items')) {
                theMovies.items.forEach((el) => {
                    results.push(el);
                });
            }
        }).catch(() => {
        });
        this.indexMovies++;
        return results;
    }

    // returns movies for cinema
    async getMoviesCinema(): Promise<any[]> {
        return this.tmb.getMovieUpComming().then((val) => {
            const obj = JSON.parse(JSON.stringify(val));
            const tmp = obj.results;
            return Object.values(tmp);
        }).catch();
    }

    // set a current movie
    setMovie(movie: MovieResponse) {
        this.currentMovie = movie;
    }

    // return the current movie
    getMovie() {
        return this.currentMovie;
    }
}
