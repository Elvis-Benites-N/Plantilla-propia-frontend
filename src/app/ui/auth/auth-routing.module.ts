import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomRoutes } from 'src/app/core/interfaces/custom-route.interface';
import { CallbackPage } from './callback/callback.component';

const routes: CustomRoutes = [
  {
    path: 'callback',
    component: CallbackPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
