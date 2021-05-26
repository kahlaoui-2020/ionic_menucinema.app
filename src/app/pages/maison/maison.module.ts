import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MaisonPageRoutingModule } from './maison-routing.module';
import { MaisonPage } from './maison.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MaisonPageRoutingModule
    ],
    exports: [
        MaisonPage
    ],
    declarations: [MaisonPage]
})
export class MaisonPageModule { }
