import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import firebase from 'firebase';
import { AddListePage } from '../../modals/add-liste/add-liste.page';
import { FilmPage } from '../../modals/film/film.page';
import { MovieResponse } from '../../models/tmdb-data/Movie';
import { ListeService } from '../../services/listes/liste.service';
import { MovieDataService } from '../../services/movieData/movie-data.service';
import { PartagerPage } from './partager/partager.page';

@Component({
    selector: 'app-list',
    templateUrl: './listes.page.html',
    styleUrls: ['./listes.page.scss'],
})
export class ListesPage implements OnInit {
    listes: any;
    slideOpts = {
        initialSlide: 1,
        speed: 20,
        autoplay: false
    };

    constructor(public actionSheetController: ActionSheetController,
                public alertController: AlertController,
                private modalController: ModalController,
                private router: Router,
                private listeServ: ListeService,
                private afDB: AngularFireDatabase,
                private movieDataService: MovieDataService) {
    }

    ngOnInit() {
        this.getListes();
    }

    getListes() {
        this.listeServ.getListe(firebase.auth().currentUser.uid).subscribe(res => (this.listes = res));
    }

    async presentActionSheet(liste) {
        const actionSheet = await this.actionSheetController.create({
            header: liste.payload.doc.data().name,
            cssClass: 'my-custom-class',
            buttons: [
                {
                    text: 'Partager la liste',
                    icon: 'share-social',
                    handler: () => {
                        this.openPartegerModal(liste);
                    }
                }, {
                    text: 'Renommer la liste',
                    icon: 'create',
                    handler: () => {
                        this.renommerAlerte(liste);
                    }
                }, {
                    text: 'Supprimer la liste',
                    role: 'destructive',
                    icon: 'trash',
                    handler: () => {
                        this.supprimerAlert(liste);
                    }
                }, {
                    text: 'Ajouter un film (redirection vers les films)',
                    icon: 'add',
                    handler: () => {
                        this.router.navigate(['/folder/maison']);
                    }
                }, {
                    text: 'Cancel',
                    icon: 'close',
                    role: 'cancel',
                    handler: () => {
                    }
                }]
        });
        await actionSheet.present();
    }

    async openPartegerModal(liste) {
        const modal = await this.modalController.create({
            component: PartagerPage,
            componentProps: { 
                idListe: liste.payload.doc.id,
                listeIdPartage : liste.payload.doc.data().listeIdPartage
             },
            cssClass: 'my-custom-modal-css'
        });
        await modal.present();
    }

    async renommerAlerte(liste) {
        const alert = await this.alertController.create({
            header: 'Renommer la liste',
            inputs: [
                {
                    name: 'name',
                    placeholder: 'Nouveau titre'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: data => { }
                },
                {
                    text: 'Confirmer',
                    handler: data => {
                        this.listeServ.updateName(liste, data);
                    }
                }
            ]
        });
        await alert.present();
    }

    async supprimerAlert(liste) {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Voulez-vous vraiement supprimer la liste ?',
            buttons: [
                {
                    text: 'Non, retour en arrière',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => { }
                }, {
                    text: 'Oui,c\'est mon ultime bafouille !',
                    handler: () => {
                        this.listeServ.deleteListe(liste);
                    }
                }
            ]
        });
        await alert.present();
    }
    async openModal() {
        const modal = await this.modalController.create({
            component: AddListePage
        });
        return await modal.present();
    }

    async optionOnFilms(movie: MovieResponse) {
        this.movieDataService.setMovie(movie);
        const modal = await this.modalController.create({
            component: FilmPage
        });
        await modal.present();
    }
}
