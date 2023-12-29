import { Component } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { ActivationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/internal/operators/filter';
import { map } from 'rxjs/internal/operators/map';
import { DataRoute } from './core/interfaces/custom-route.interface';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styles: [],
})
export class AppComponent {
  constructor(
    private readonly router: Router,
    private readonly title: Title,
    private readonly meta: Meta
  ) {
    this.router.events
      .pipe(
        filter((evento) => evento instanceof ActivationEnd),
        filter((evento: any) => evento.snapshot.firstChild === null),
        map((evento: ActivationEnd) => evento.snapshot.data)
      )
      .subscribe((data: DataRoute) => {
        const titleText = data.webtitle ?? 'Sistema';
        const descriptionText = data.webdescription ?? 'Sistema';

        const metaTag: MetaDefinition = {
          name: 'description',
          content: descriptionText,
        };

        this.title.setTitle(titleText);
        this.meta.updateTag(metaTag);
      });
  }
}
