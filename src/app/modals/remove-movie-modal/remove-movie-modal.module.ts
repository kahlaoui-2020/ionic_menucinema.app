import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RemoveMovieModalPageRoutingModule } from './remove-movie-modal-routing.module';
import { RemoveMovieModalPage } from './remove-movie-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RemoveMovieModalPageRoutingModule
  ],
  declarations: [RemoveMovieModalPage]
})
export class RemoveMovieModalPageModule { }
