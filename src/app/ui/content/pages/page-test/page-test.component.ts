import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'page-test',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-test.component.html',
  styleUrls: ['./page-test.component.scss'],
})
export class PageTestPage implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
