import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import firebase from 'firebase';
import { ListeService } from '../../services/listes/liste.service';
import { MovieDataService } from '../../services/movieData/movie-data.service';

@Component({
    selector: 'app-add-movie-modal',
    templateUrl: './add-movie-modal.page.html',
    styleUrls: ['./add-movie-modal.page.scss'],
})
export class AddMovieModalPage implements OnInit {

    lists: any;
    currentList: any;

    constructor(private movieDataService: MovieDataService,
                private alertMovie: AlertController,
                private modalController: ModalController,
                private listService: ListeService) {
    }

    ngOnInit() {
        this.listService.getListe(firebase.auth().currentUser.uid).subscribe(
            res => (
                this.lists = res
            )
        );
    }

    async dismissModal() {
        await this.modalController.dismiss();
    }

    async addMovie(list: any) {
        const movie = this.movieDataService.getMovie();
        await this.listService.addMovie(list, movie);
        const alert = await this.alertMovie.create({
            header: 'Ajout effecuté',
            message: ' La liste a été mise à jour',
            buttons: ['OK'],
        });
        await alert.present();
        await alert.onDidDismiss();
        this.dismissModal().then().catch();
    }
}
