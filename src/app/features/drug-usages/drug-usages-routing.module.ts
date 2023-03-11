import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrugUsagesComponent } from './drug-usages.component';

const routes: Routes = [{ path: '', component: DrugUsagesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DrugUsagesRoutingModule { }
