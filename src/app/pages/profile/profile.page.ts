import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { Client } from 'src/app/models/Client';
import { AuthService } from '../../services/auth/auth.service';
import { ProfilService } from '../../services/profil/profil.service';
import { ListeService } from 'src/app/services/listes/liste.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: Client = null;
  constructor(private route: Router,
              private profil: ProfilService,
              private authService: AuthService,
              private fire: AngularFireAuth,
              private listeServ :ListeService) {
  }
  ngOnInit() {
    this.getProfil();
    
  }

  getProfil() {
    this.user = this.profil.getUser();
  }

  logOut() {
    this.authService.signOut();
  }

  deleteProfil() {
    firebase.auth().currentUser.delete().then(
      () => {
        this.route.navigate(['']);
      }
    ).catch(
      (error) => { }
    );
  }
}
