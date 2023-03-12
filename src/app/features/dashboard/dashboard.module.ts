import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NgZorroModule } from '../../ng-zorro.module';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    NgZorroModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
