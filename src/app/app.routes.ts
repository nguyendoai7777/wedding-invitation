import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/create',
    pathMatch: 'full',
  },
  {
    path: 'create',
    loadComponent: () => import('./pages/create/create.component').then(c => c.CreateComponent)
  },
  {
    path: 'invite',
    loadComponent: () => import('./pages/invite/invite.component').then(c => c.InviteComponent)
  },
  {
    path: '**',
    redirectTo: '/create',
    pathMatch: 'full',
  }
];
