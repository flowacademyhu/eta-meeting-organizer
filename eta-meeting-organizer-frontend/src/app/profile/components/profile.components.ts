import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  styles: [`
  `],
  template: `
    <mat-card class="card">
    {{'profile.username' | translate}}: <br>
    {{'profile.lastName' | translate}}: <br>
    {{'profile.firstName' | translate}}: <br>
    {{'profile.email' | translate}}: <br>
    {{'profile.role' | translate}}: <br>
    </mat-card>
  `
})

export class ProfileComponent implements OnInit {
  public language: string;

  constructor(private readonly translate: TranslateService) {
    this.language = this.translate.currentLang;
   }

  ngOnInit() { }

}