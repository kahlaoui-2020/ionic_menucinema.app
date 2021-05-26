import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartagerPage } from './partager.page';

const routes: Routes = [
  {
    path: '',
    component: PartagerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartagerPageRoutingModule { }
