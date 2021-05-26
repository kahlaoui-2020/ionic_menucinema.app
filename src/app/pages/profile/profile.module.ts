import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProfilePageRoutingModule } from './profile-routing.module';
import { ProfilePage } from './profile.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ProfilePageRoutingModule
    ],
    exports: [
        ProfilePage
    ],
    declarations: [ProfilePage]
})
export class ProfilePageModule { }
