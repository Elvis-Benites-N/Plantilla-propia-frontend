import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { filter } from 'rxjs/internal/operators/filter';
import { Breadcrumb } from 'src/app/core/interfaces/custom-route.interface';

@Component({
  selector: 'titulo',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.scss'],
})
export class TituloComponent implements OnInit, OnDestroy {
  public title = '';
  public description = '';
  public breadcrumbs: Breadcrumb[] = [];

  private routeChangeEndSub: Subscription;

  constructor(private readonly router: Router) {
    this.routeChangeEndSub = this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e) => {
        setTimeout(() => {
          this.breadcrumbs = [];
          this.parseBreadCrumbs(this.router.routerState.snapshot.root);
        });
      });
  }

  ngOnInit(): void {}

  private parseBreadCrumbs(node: ActivatedRouteSnapshot) {
    if (node.data['breadcrumb']) {
      this.breadcrumbs.push(node.data['breadcrumb']);
    }

    if (node.firstChild) {
      this.parseBreadCrumbs(node.firstChild);
    } else {
      this.title = node.data['title'] ?? 'Sín título';
      this.description =
        node.data['description'] ?? 'No hay descripción disponible';
    }
  }

  ngOnDestroy(): void {
    this.routeChangeEndSub?.unsubscribe();
  }
}
