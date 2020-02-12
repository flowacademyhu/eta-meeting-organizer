import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  styles: [
    `
     .footer {
    font-size: smaller;
    height: 20px !important;
    min-height: 20px !important;
    position: absolute;
    bottom: 0;
    text-align: center;
    align-items: center;
    padding: 8px;
    position: sticky;
    bottom:0;
    justify-content: center;
    background: #333333;
  }`],
  template: `
  <mat-grid-tile-footer class="md-padding">
  <mat-toolbar color="primary" class="footer" flex>
      © 2020 Wysio
  </mat-toolbar>
  </mat-grid-tile-footer>
 `
})

export class FooterComponent {
}
