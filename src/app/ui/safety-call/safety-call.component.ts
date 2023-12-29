import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorUtil } from 'src/app/core/utils/error.util';
import { HttpExceptionNotifier } from 'src/app/core/interceptors/http.interceptor';
import { Subscription } from 'rxjs/internal/Subscription';

import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzResultModule } from 'ng-zorro-antd/result';

@Component({
  selector: 'safety-call',
  standalone: true,
  imports: [
    CommonModule,
    NzResultModule,
    NzButtonModule,
    NzIconModule,
    NzAlertModule,
  ],
  templateUrl: './safety-call.component.html',
  styleUrls: ['./safety-call.component.scss'],
})
export class SafetyCallComponent implements OnInit, OnDestroy {
  @Input()
  esFiltros: boolean = false;

  @Output()
  retry: EventEmitter<any>;

  public errorMessage: string;
  public errorSub: Subscription;

  constructor(private readonly httpExceptionNotifier: HttpExceptionNotifier) {
    this.retry = new EventEmitter();
    this.errorSub = this.httpExceptionNotifier.escuchar().subscribe((error) => {
      this.errorMessage =
        error.status === 0
          ? 'Sin conexión al servidor'
          : ErrorUtil.getApiErrorMessage(error);
    });
  }

  ngOnInit(): void {}

  clickRetry() {
    this.errorMessage = null;
    this.retry.emit();
  }

  ngOnDestroy(): void {
    this.errorSub?.unsubscribe();
  }
}
