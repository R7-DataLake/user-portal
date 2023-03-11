import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DrugUsagesRoutingModule } from './drug-usages-routing.module';
import { DrugUsagesComponent } from './drug-usages.component';
import { NgZorroModule } from '../../ng-zorro.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalDrugUsageNewComponent } from './modals/modal-drug-usage-new/modal-drug-usage-new.component';


@NgModule({
  declarations: [
    DrugUsagesComponent,
    ModalDrugUsageNewComponent,
  ],
  imports: [
    CommonModule,
    NgZorroModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    DrugUsagesRoutingModule
  ]
})
export class DrugUsagesModule { }
