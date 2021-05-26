import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {FilmPage} from '../../modals/film/film.page';
import {MovieResponse} from '../../models/tmdb-data/Movie';
import {MovieDataService} from '../../services/movieData/movie-data.service';

@Component({
    selector: 'app-cinema',
    templateUrl: './cinema.page.html',
    styleUrls: ['./cinema.page.scss'],
})
export class CinemaPage implements OnInit {
    movies: MovieResponse[] = [];
    selectDate: Date;
    moviesFilter: MovieResponse[] = [];

    constructor(private dataMovieService: MovieDataService, private modalController: ModalController) {
        this.selectDate = new Date();
    }

    ngOnInit() {
        this.nowPlayingMovies().then().catch();

    }

    async nowPlayingMovies() {
        this.movies = await this.dataMovieService.getMoviesCinema().then().catch();
        this.moviesFilter = this.movies;
    }

    changeSelectedDate(val: string) {
        this.selectDate = new Date(val);
        this.moviesFilter = this.moviesFilter.filter((movie) => {
            const tmp = new Date(movie.release_date);
            if (this.selectDate.toDateString() === tmp.toDateString()) {
                return val;
            }
        });
    }

    async openModal(movie) {
        this.dataMovieService.setMovie(movie);
        const modal = await this.modalController.create({
            component: FilmPage
        });
        await modal.present();
    }
}
