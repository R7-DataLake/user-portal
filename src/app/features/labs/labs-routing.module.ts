import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LabsComponent } from './labs.component';

const routes: Routes = [{ path: '', component: LabsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabsRoutingModule { }
