import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OccupationsComponent } from './occupations.component';

const routes: Routes = [{ path: '', component: OccupationsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OccupationsRoutingModule { }
