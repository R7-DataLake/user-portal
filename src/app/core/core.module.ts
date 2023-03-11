import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortThaiDatePipe } from './pipes/short-thai-date.pipe';

@NgModule({
  declarations: [
    ShortThaiDatePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ShortThaiDatePipe
  ]
})
export class CoreModule { }
