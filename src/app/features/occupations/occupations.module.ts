import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OccupationsRoutingModule } from './occupations-routing.module';
import { OccupationsComponent } from './occupations.component';
import { NgZorroModule } from '../../ng-zorro.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ModalOccupationNewComponent } from './modals/modal-occupation-new/modal-occupation-new.component';
import { ModalOccupationMappingComponent } from './modals/modal-occupation-mapping/modal-occupation-mapping.component';


@NgModule({
  declarations: [
    OccupationsComponent,
    ModalOccupationNewComponent,
    ModalOccupationMappingComponent
  ],
  imports: [
    CommonModule,
    NgZorroModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    OccupationsRoutingModule
  ]
})
export class OccupationsModule { }
