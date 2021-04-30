import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { IoniconSelectorComponent } from './ionicon-selector.component';

@NgModule({
  declarations: [IoniconSelectorComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [
    IoniconSelectorComponent,
  ]
})
export class IoniconSelectorModule { }
