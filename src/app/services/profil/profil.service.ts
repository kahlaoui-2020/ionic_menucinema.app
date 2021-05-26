import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Client } from '../../models/Client';

@Injectable({
    providedIn: 'root'
})
export class ProfilService {

    user = null;

    constructor() {
        this.user = firebase.auth().currentUser;
    }

    getUser(): Client {
        let user: Client;
        if (this.user != null) {
            const name = this.user.displayName.split(' ')[0];
            const lastname = this.user.displayName.split(' ')[1];
            const email = this.user.email;
            const urlPhoto = this.user.photoURL;
            user = new Client('', name, lastname, urlPhoto, email);
        }
        return user;
    }

    deleteUser() {
        this.user.delete().then(() => { }).catch((error) => { });
    }

    changeProfil(name: string) {
        this.user.updateProfile(
            { displayName: name }
        ).then(
            () => { }
        ).catch((error) => { });
    }
}
