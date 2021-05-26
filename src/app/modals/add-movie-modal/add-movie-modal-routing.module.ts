import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMovieModalPage } from './add-movie-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AddMovieModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddMovieModalPageRoutingModule { }
