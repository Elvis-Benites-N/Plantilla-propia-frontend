import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { CallbackPage } from './callback/callback.component';
import { AccesoDenegadoComponent } from './acceso-denegado/acceso-denegado.component';
import { SesionExpiradaComponent } from './sesion-expirada/sesion-expirada.component';

@NgModule({
  declarations: [
    CallbackPage,
    AccesoDenegadoComponent,
    SesionExpiradaComponent,
  ],
  imports: [CommonModule, AuthRoutingModule],
})
export class AuthModule {}
