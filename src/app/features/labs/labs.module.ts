import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LabsRoutingModule } from './labs-routing.module';
import { LabsComponent } from './labs.component';
import { SharedModule } from '../../shared/shared.module';
import { NgZorroModule } from '../../ng-zorro.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalLabNewComponent } from './modals/modal-lab-new/modal-lab-new.component';
import { ModalLabMappingComponent } from './modals/modal-lab-mapping/modal-lab-mapping.component';


@NgModule({
  declarations: [
    LabsComponent,
    ModalLabNewComponent,
    ModalLabMappingComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgZorroModule,
    LabsRoutingModule
  ]
})
export class LabsModule { }
