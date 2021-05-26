import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CinemaPageModule } from '../pages/cinema/cinema.module';
import { HomePageModule } from '../pages/home/home.module';
import { ListPageModule } from '../pages/listes/listes.module';
import { MaisonPageModule } from '../pages/maison/maison.module';
import { ProfilePageModule } from '../pages/profile/profile.module';
import { FolderPageRoutingModule } from './folder-routing.module';
import { FolderPage } from './folder.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule,
    ProfilePageModule,
    ListPageModule,
    MaisonPageModule,
    CinemaPageModule,
    HomePageModule
  ],
  declarations: [FolderPage]
})
export class FolderPageModule { }
