import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomRoutes } from 'src/app/core/interfaces/custom-route.interface';
import { ContentPage } from './content.component';

const routes: CustomRoutes = [
  {
    path: '',
    component: ContentPage,
    data: {
      breadcrumb: {
        label: 'Inicio',
        routerLink: '/',
        icon: 'home',
      },
    },
    children: [
      {
        path: '',
        data: {
          webtitle: 'Inicio',
          webdescription: 'Acerca del Sistema',
          title: 'Inicio',
          description: 'Acerca del Sistema',
          breadcrumb: null,
        },
        loadComponent: () =>
          import('./pages/inicio/inicio.component').then((m) => m.InicioPage),
      },
      {
        path: 'page-test',
        data: {
          webtitle: 'Page Test',
          webdescription: 'Page Test',
          title: 'Page Test',
          description: 'Acerca de Page Test',
          breadcrumb: {
            label: 'Page Test',
            icon: 'file-done',
          },
        },
        loadComponent: () =>
          import('./pages/page-test/page-test.component').then(
            (m) => m.PageTestPage
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentRoutingModule {}
