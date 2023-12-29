import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ContentRoutingModule } from './content-routing.module';
import { TituloComponent } from './components/titulo/titulo.component';
import { ContentPage } from './content.component';

import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';

@NgModule({
  declarations: [TituloComponent, ContentPage],
  imports: [
    CommonModule,
    ContentRoutingModule,
    NzBreadCrumbModule,
    NzIconModule,
    NzLayoutModule,
    NzPageHeaderModule,
  ],
})
export class ContentModule {}
