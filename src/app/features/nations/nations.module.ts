import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NationsRoutingModule } from './nations-routing.module';
import { NationsComponent } from './nations.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroModule } from '../../ng-zorro.module';
import { SharedModule } from '../../shared/shared.module';
import { ModalNationNewComponent } from './modals/modal-nation-new/modal-nation-new.component';
import { ModalNationMappingComponent } from './modals/modal-nation-mapping/modal-nation-mapping.component';


@NgModule({
  declarations: [
    NationsComponent,
    ModalNationNewComponent,
    ModalNationMappingComponent
  ],
  imports: [
    CommonModule,
    NgZorroModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NationsRoutingModule
  ]
})
export class NationsModule { }
