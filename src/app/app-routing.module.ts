import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { LayoutComponent } from './features/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule)
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'drugs',
        loadChildren: () => import('./features/drugs/drugs.module').then(m => m.DrugsModule)
      },
      {
        path: 'drug-usages',
        loadChildren: () => import('./features/drug-usages/drug-usages.module').then(m => m.DrugUsagesModule)
      },
      {
        path: 'labs',
        loadChildren: () => import('./features/labs/labs.module').then(m => m.LabsModule)
      },
      {
        path: 'lab-groups',
        loadChildren: () => import('./features/lab-groups/lab-groups.module').then(m => m.LabGroupsModule)
      },
      {
        path: 'occupations',
        loadChildren: () => import('./features/occupations/occupations.module').then(m => m.OccupationsModule)
      },
      {
        path: 'insurances',
        loadChildren: () => import('./features/insurances/insurances.module').then(m => m.InsurancesModule)
      },
      {
        path: 'providers',
        loadChildren: () => import('./features/providers/providers.module').then(m => m.ProvidersModule)
      },
      {
        path: 'nations',
        loadChildren: () => import('./features/nations/nations.module').then(m => m.NationsModule)
      },
      {
        path: 'tables',
        loadChildren: () => import('./features/tables/tables.module').then(m => m.TablesModule)
      },
    ]
  },
  {
    path: 'not-found',
    loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule)
  },

  { path: 'dashboard', redirectTo: 'drugs', pathMatch: 'full' },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
