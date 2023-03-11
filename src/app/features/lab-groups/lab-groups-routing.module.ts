import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LabGroupsComponent } from './lab-groups.component';

const routes: Routes = [{ path: '', component: LabGroupsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabGroupsRoutingModule { }
