import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { APP_CONFIG, Config } from 'src/app/core/config/config';

@Component({
  selector: 'landing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingPage {
  public readonly ssoURL: string;

  constructor(
    @Inject(APP_CONFIG)
    readonly config: Config
  ) {
    this.ssoURL =
      config.services.loginQuipu.url +
      `?sistema=${config.services.loginQuipu.publicKey}`;
  }
}
