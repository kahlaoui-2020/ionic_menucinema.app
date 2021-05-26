import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaisonPage } from './maison.page';

const routes: Routes = [
  {
    path: '',
    component: MaisonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaisonPageRoutingModule { }
