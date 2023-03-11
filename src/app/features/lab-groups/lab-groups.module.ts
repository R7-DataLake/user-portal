import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LabGroupsRoutingModule } from './lab-groups-routing.module';
import { LabGroupsComponent } from './lab-groups.component';
import { ModalLabGroupNewComponent } from './modals/modal-lab-group-new/modal-lab-group-new.component';
import { NgZorroModule } from '../../ng-zorro.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LabGroupsComponent,
    ModalLabGroupNewComponent
  ],
  imports: [
    CommonModule,
    NgZorroModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    LabGroupsRoutingModule
  ]
})
export class LabGroupsModule { }
