import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AlertController, ModalController} from '@ionic/angular';
import {MovieResponse} from '../../models/tmdb-data/Movie';
import {MovieDataService} from '../../services/movieData/movie-data.service';
import {TmdbService} from '../../services/tmdb.service';
import {AddMovieModalPage} from '../add-movie-modal/add-movie-modal.page';
import {RemoveMovieModalPage} from '../remove-movie-modal/remove-movie-modal.page';
import {AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase';
import {Router} from '@angular/router';
import {AddListePage} from '../add-liste/add-liste.page';
import {ListeService} from '../../services/listes/liste.service';

@Component({
    selector: 'app-film',
    templateUrl: './film.page.html',
    styleUrls: ['./film.page.scss'],
})
export class FilmPage implements OnInit {
    currentMovie: MovieResponse;
    providerMovie: any;
    lists: Array<any> = new Array<any>();
    isInList = false;
    private isAuth = false;
    private uid: any = '';
    private existList = false;

    constructor(private modalController: ModalController,
                private movieDataService: MovieDataService,
                private tmb: TmdbService,
                private listService: ListeService,
                private afs: AngularFirestore,
                private router: Router,
                private fire: AngularFireAuth,
                private alertController: AlertController) {
    }

    ngOnInit() {

        this.verifierUser();
        this.uid = firebase.auth().currentUser.uid;
        this.currentMovie = this.movieDataService.getMovie();
        this.tmb.getMovieWatchProvider(this.currentMovie.id).then((provider) => {
            if (provider) {
                const obj = JSON.parse(JSON.stringify(provider));
                if (obj.results.hasOwnProperty('FR') && obj.results.FR.hasOwnProperty('link')) {
                    this.providerMovie = obj.results.FR.link;
                }
            }
        });

        if (this.uid !== null) {
            const userDoc = this.afs.firestore.collection(`listes`);
            userDoc.get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (this.uid === doc.data().uid) {
                        this.existList = true;
                        doc.data().films.filter((ele) => {
                            if (this.currentMovie.id === ele.id) {
                                this.isInList = true;
                            }
                        });
                    }
                });
            });
        }
    }

    async dismissModal() {
        await this.modalController.dismiss();
    }

    async addMovie() {
        if (this.isAuth) {
            if (this.existList) {
                const modal = await this.modalController.create({
                    component: AddMovieModalPage
                });
                await modal.present();
            } else {
                const alert = await this.alertController.create({
                    header: ' Aucune Liste Trouvée',
                    message: 'Veuillez ajouter une Liste',
                    buttons: ['OK']
                });
                await alert.present();
            }
        }
    }

    async removeMovieInList() {
        if (this.isAuth) {
            const modal = await this.modalController.create({
                component: RemoveMovieModalPage
            });
            await modal.present();
        }
    }


    verifierUser() {

        this.fire.onAuthStateChanged(
            (user) => {
                if (user != null) {
                    this.isAuth = true;
                } else {
                    this.isAuth = false;
                }
            }
        ).then().catch();
    }
}
