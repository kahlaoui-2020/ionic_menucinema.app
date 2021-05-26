import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListesPage } from './listes.page';

const routes: Routes = [
  {
    path: '',
    component: ListesPage
  }, {
    path: 'partager',
    loadChildren: () => import('./partager/partager.module').then(m => m.PartagerPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListPageRoutingModule { }
