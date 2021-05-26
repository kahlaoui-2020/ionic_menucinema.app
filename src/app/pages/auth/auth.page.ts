import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { AuthService } from '../../services/auth/auth.service';
@Component({
    selector: 'app-auth',
    templateUrl: './auth.page.html',
    styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

    constructor(private auth: AuthService,
                private popover: PopoverController) {
       
    }
    compte;
    ngOnInit() {
     }

    closePopover() {
        this.popover.dismiss();
    }

    google() {
        this.auth.loginWithGoogle();
        
        this.closePopover();
    }

    facebook() {
        this.auth.loginWithFacebook();
        this.closePopover();
    }
}
