import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalSearchComponent } from './modals/modal-search/modal-search.component';
import { NgZorroModule } from '../ng-zorro.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ModalSearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgZorroModule
  ],
  exports: [
    ModalSearchComponent
  ]
})
export class SharedModule { }
