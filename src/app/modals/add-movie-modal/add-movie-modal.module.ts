import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddMovieModalPageRoutingModule } from './add-movie-modal-routing.module';
import { AddMovieModalPage } from './add-movie-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddMovieModalPageRoutingModule
  ],
  declarations: [AddMovieModalPage]
})
export class AddMovieModalPageModule { }
