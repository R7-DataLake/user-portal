import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProvidersRoutingModule } from './providers-routing.module';
import { ProvidersComponent } from './providers.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroModule } from '../../ng-zorro.module';
import { SharedModule } from '../../shared/shared.module';
import { ModalProviderNewComponent } from './modals/modal-provider-new/modal-provider-new.component';
import { CoreModule } from '../../core/core.module';


@NgModule({
  declarations: [
    ProvidersComponent,
    ModalProviderNewComponent
  ],
  imports: [
    CommonModule,
    NgZorroModule,
    SharedModule,
    FormsModule,
    CoreModule,
    ReactiveFormsModule,
    ProvidersRoutingModule
  ]
})
export class ProvidersModule { }
