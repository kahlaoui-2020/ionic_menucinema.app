import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { Client } from 'src/app/models/Client';
import { ListeService } from '../listes/liste.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, protected fire: AngularFireAuth,private listeServ: ListeService) { }
  compte;
  addUser(){
    const user = firebase.auth().currentUser;
        console.log(user.uid);

        console.log(user.email);
        const data: Client= {id:user.uid, nom:user.displayName,photo:user.photoURL,email:user.email};
        this.listeServ.getUser(firebase.auth().currentUser.email).subscribe(res => (res.length==0?this.listeServ.addUser(data):null));
        
  }
  loginWithGoogle() {
    this.fire.signInWithPopup(new firebase.auth.GoogleAuthProvider()).finally(
      () => this.addUser()
    );
  }

  loginWithFacebook() {
    this.fire.signInWithPopup(new firebase.auth.FacebookAuthProvider()).finally(
      () => {
        setTimeout(() => {
          this.router.navigate(['']);
        }, 500);

      });
  }

  signOut() {
    this.fire.signOut().finally(
      () => {
        setTimeout(() => {
          this.router.navigate(['']);
        }, 500);

      }
    );
  }
}
