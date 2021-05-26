import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase';

@Injectable({
    providedIn: 'root'
})
export class ListeService {


    constructor(private firestore: AngularFirestore) { }

    createListe(data) {
        return new Promise<any>((resolve, reject) => {
            this.firestore
                .collection('listes').add(data)
                .then(res => {
                }, err => reject(err));

        });
    }

    getListe(uid) {
        return this.firestore.collection('listes', ref => ref.where('uid', '==', uid)).snapshotChanges();
    }

    deleteListe(liste) {
        return this.firestore.collection('listes').doc(liste.payload.doc.id).delete();
    }

    updateName(liste, data) {
        return this.firestore.collection('listes').doc(liste.payload.doc.id).update(data);
    }

    addMovie(list, data) {
        return this.firestore.collection('listes').doc(list.payload.doc.id).update(
            {
                films: firebase.firestore.FieldValue.arrayUnion(data)
            });
    }
    addUser(user){
      return new Promise<any>((resolve, reject) => {
        this.firestore
            .collection('users').add(user)
            .then(res => {
            }, err => reject(err));

    });
    }
    getUser(email){
      return this.firestore.collection('users', ref => ref.where('email', '==', email)).snapshotChanges();
    }
    getListeUser(){
      return this.firestore.collection('users').snapshotChanges();
    }
    updateIdPartage(idListe,id){
      return this.firestore.collection('listes').doc(idListe).update(
        {
          listeIdPartage: id,partage:true
        });
    }
    



}
