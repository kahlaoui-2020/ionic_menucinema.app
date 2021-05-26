import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RemoveMovieModalPage } from './remove-movie-modal.page';

const routes: Routes = [
  {
    path: '',
    component: RemoveMovieModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RemoveMovieModalPageRoutingModule { }
