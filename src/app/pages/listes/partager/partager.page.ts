import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, AlertController } from '@ionic/angular';
import { ListeService } from 'src/app/services/listes/liste.service';
import firebase from 'firebase';
import { Liste } from 'src/app/models/lists/liste';

@Component({
  selector: 'app-partager',
  templateUrl: './partager.page.html',
  styleUrls: ['./partager.page.scss'],
})
export class PartagerPage implements OnInit {

  emailRecherche = '';
  emailsRecherches= '';
  listesEmail;
  idListe;
  listeIdPartage;
  constructor(private modalController: ModalController,private listeServ:ListeService, private alertPartage :AlertController) {
   }

  ngOnInit() {
    this.listeServ.getListeUser().subscribe(res => (this.listesEmail = res));
    
  }

  filterEmails(email: string) {
    this.emailsRecherches = this.listesEmail.filter(item => {
        return item.payload.doc.data().email.toLowerCase().indexOf(email.toLowerCase()) > -1;
    });
  }

  async giveAccess(email){
    this.listeIdPartage.push(email.payload.doc.data().id)
    this.listeServ.updateIdPartage(this.idListe,this.listeIdPartage);
    const alert = await this.alertPartage.create({
      header: 'Partage effecuté',
      message: ' La liste a été partagé',
      buttons: ['OK'],
  });
  await alert.present();
  await alert.onDidDismiss();
    this.dismissModal();
  }
  async dismissModal() {
    await this.modalController.dismiss();
  }
}
