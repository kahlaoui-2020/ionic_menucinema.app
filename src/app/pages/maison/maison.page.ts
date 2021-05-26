import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { FilmPage } from '../../modals/film/film.page';
import { MovieResponse } from '../../models/tmdb-data/Movie';
import { MovieDataService } from '../../services/movieData/movie-data.service';

@Component({
    selector: 'app-maison',
    templateUrl: './maison.page.html',
    styleUrls: ['./maison.page.scss'],
})
export class MaisonPage implements OnInit {

    movies: Array<MovieResponse>;
    movieFilters: Array<MovieResponse>;
    movieTitle = '';
    valueRecherche: any;

    constructor(private modalController: ModalController,
                private movieDataService: MovieDataService,
                private alertMovie: AlertController) {
        this.movies = new Array<MovieResponse>();
    }

    ngOnInit() {
        this.moreMovies().then().catch();
    }

    async moreMovies() {
        this.movies = await this.movieDataService.getMoviesMaison().then().catch();
        this.movieFilters = this.movies;
    }

    filterMovies(movieTitle: string) {
        this.movieFilters = this.movies.filter(item => {
            return item.original_title.toLowerCase().indexOf(movieTitle.toLowerCase()) > -1;
        });
    }

    async openModal(movie) {
        this.movieDataService.setMovie(movie);
        const modal = await this.modalController.create({
            component: FilmPage
        });
        await modal.present();
    }
}
