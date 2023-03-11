import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DrugsRoutingModule } from './drugs-routing.module';
import { DrugsComponent } from './drugs.component';
import { NgZorroModule } from '../../ng-zorro.module';
import { SharedModule } from '../../shared/shared.module';
import { ModalDrugMappingComponent } from './modals/modal-drug-mapping/modal-drug-mapping.component';
import { ModalDrugNewComponent } from './modals/modal-drug-new/modal-drug-new.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DrugsComponent,
    ModalDrugMappingComponent,
    ModalDrugNewComponent
  ],
  imports: [
    CommonModule,
    NgZorroModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    DrugsRoutingModule,
  ]
})
export class DrugsModule { }
