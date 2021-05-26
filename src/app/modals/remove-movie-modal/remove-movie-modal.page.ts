import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AlertController, ModalController} from '@ionic/angular';
import {Liste} from '../../models/lists/liste';
import {MovieDataService} from '../../services/movieData/movie-data.service';
import firebase from 'firebase';

@Component({
    selector: 'app-remove-movie-modal',
    templateUrl: './remove-movie-modal.page.html',
    styleUrls: ['./remove-movie-modal.page.scss'],
})
export class RemoveMovieModalPage implements OnInit {

    private documenthWithLists: any[];
    private lesListsDesDocument: any[];
    private uid: any;

    constructor(private modalController: ModalController,
                private alertMovie: AlertController,
                private movieDataService: MovieDataService,
                private afs: AngularFirestore) {
    }

    ngOnInit() {
        this.documenthWithLists = [];
        this.lesListsDesDocument = [];
        this.uid = firebase.auth().currentUser.uid;

        const userDoc = this.afs.firestore.collection(`listes`);
        userDoc.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                doc.data().films.filter((ele) => {
                    if (this.movieDataService.getMovie().id === ele.id && doc.data().uid === this.uid) {
                        this.documenthWithLists.push({idDoc: doc.id, theLists: doc.data()});
                        this.lesListsDesDocument.push(doc.data());
                    }
                });
            });
        });
    }

    async removeLists(list: Liste) {
        let data = [];
        let theDoc;
        this.documenthWithLists.forEach((el) => {
            if (el.theLists.name === list.name) {
                const theMovies = el.theLists.films;
                data = theMovies.filter((film) => {
                    if (film.id !== this.movieDataService.getMovie().id) {
                        theDoc = el;
                        return film;
                    } else {
                        theDoc = el;
                        return null;
                    }
                });
            }
        });
        this.afs.firestore.collection(`listes`).doc(theDoc.idDoc).update({films: data});
        const alert = await this.alertMovie.create({
            header: 'Suppression effecuté',
            message: ' La liste a été mise à jour',
            buttons: ['OK'],
        });
        await alert.present();
        await alert.onDidDismiss();
        this.dismissModal().then().catch();
    }

    async dismissModal() {
        await this.modalController.dismiss();
    }
}
