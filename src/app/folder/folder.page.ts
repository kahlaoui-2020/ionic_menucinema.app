import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import firebase from 'firebase';
import { AuthPage } from '../pages/auth/auth.page';
import { AuthService } from '../services/auth/auth.service';

@Component({
    selector: 'app-folder',
    templateUrl: './folder.page.html',
    styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
    public folder: string;

    public isAuth: boolean;
    public urlPhoto: string;

    constructor(private login: AuthService,
                private fire: AngularFireAuth,
                private popover: PopoverController,
                private activatedRoute: ActivatedRoute,
                private location: Location) {
    }

    ngOnInit() {
        this.folder = this.activatedRoute.snapshot.paramMap.get('id');
        this.verifierUser();
        if (this.folder === 'logOut') {
            this.login.signOut();
        }
    }

    verifierUser() {
        this.fire.onAuthStateChanged(
            (user) => {
                if (user != null) {
                    this.isAuth = true;
                    this.urlPhoto = firebase.auth().currentUser.photoURL;
                } else {
                    this.isAuth = false;
                }
            }
        );
    }

    ngOnChange() {
        this.verifierUser();
        if (this.folder === 'logOut') {
            this.login.signOut();
        }
    }

    async auth() {
        const popover = await this.popover.create({
            component: AuthPage,
            translucent: true
        });
        return popover.present();
    }

    backTo() {
        this.location.back();
    }
}

