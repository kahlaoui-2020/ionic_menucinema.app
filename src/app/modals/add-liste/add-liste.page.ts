import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ModalController } from '@ionic/angular';
import firebase from 'firebase';
import { Liste } from '../../models/lists/liste';
import { MovieResponse } from '../../models/tmdb-data/Movie';
import { ListeService } from '../../services/listes/liste.service';

@Component({
    selector: 'app-add-liste',
    templateUrl: './add-liste.page.html',
    styleUrls: ['./add-liste.page.scss'],
})
export class AddListePage implements OnInit {

    constructor(private modalController: ModalController, private listeServ: ListeService, public afAuth: AngularFireAuth) { }

    nomListe: string;
    films: Array<MovieResponse> = new Array<MovieResponse>();
    uid;

    ngOnInit() {
        this.uid = firebase.auth().currentUser.uid;
    }

    async closeModal() {
        await this.modalController.dismiss();
    }

    getUid() {
        this.uid = firebase.auth().currentUser.uid;

    }

    onSubmit() {
        const data: Liste = {
            uid: this.uid, name: this.nomListe, films: this.films,
            partage: false, listeIdPartage: []
        };
        this.listeServ.createListe(data)
            .then(res => {
                this.closeModal();
            });
        this.closeModal();
    }
}
