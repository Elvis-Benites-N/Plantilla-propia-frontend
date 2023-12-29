import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomRoutes } from './core/interfaces/custom-route.interface';
import { SesionNoIniciadaGuard } from './core/guards/sesion-no-iniciada.guard';
import { SesionIniciadaGuard } from './core/guards/sesion-iniciada.guard';

const routes: CustomRoutes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./ui/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'landing',
    canActivate: [SesionNoIniciadaGuard],
    canLoad: [SesionNoIniciadaGuard],
    data: {
      webtitle: 'Sistema',
      webdescription: 'Descripción sistema',
    },
    loadComponent: () =>
      import('./ui/landing/landing.component').then((m) => m.LandingPage),
  },
  {
    path: '',
    canActivate: [SesionIniciadaGuard],
    canLoad: [SesionIniciadaGuard],
    loadChildren: () =>
      import('./ui/content/content.module').then((m) => m.ContentModule),
  },
  {
    path: '**',
    data: {
      webtitle: 'Página no encontrada',
      webdescription: 'Página no encontrada',
    },
    loadComponent: () =>
      import('./ui/not-found/not-found.component').then(
        (mod) => mod.NotFoundPage
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
