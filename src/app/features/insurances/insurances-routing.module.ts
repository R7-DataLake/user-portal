import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsurancesComponent } from './insurances.component';

const routes: Routes = [{ path: '', component: InsurancesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsurancesRoutingModule { }
