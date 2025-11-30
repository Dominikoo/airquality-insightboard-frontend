import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'air-quality',
    loadChildren: () =>
      import('./air-quality/air-quality.routes').then(m => m.AIR_QUALITY_ROUTES)
  },
  {
    path: '',
    redirectTo: 'air-quality',
    pathMatch: 'full'
  }
];
