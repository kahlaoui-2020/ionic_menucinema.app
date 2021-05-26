import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ListPageRoutingModule } from './listes-routing.module';
import { ListesPage } from './listes.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ListPageRoutingModule
    ],
    exports: [
        ListesPage
    ],
    declarations: [ListesPage]
})
export class ListPageModule { }
