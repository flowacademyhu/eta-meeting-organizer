import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-welcome-component',
  styles: [`
    .card{
      margin-top: 10%;
      width: 50%;
    }
    .field{
      width:100%;
    }
    .toggle{
      margin-top:5%
    }
  `],
  template: `
<form [formGroup]="profileForm">
  <mat-card class="card">
    <p>
      <mat-form-field class="field">
        <mat-label>{{'meeting-room.text' | translate}}</mat-label>
        <input type="text" formControlName="name" matInput placeholder="{{'meeting-room.placeholderName' | translate}}">
      </mat-form-field>
    </p>
      <mat-form-field class="field">
        <mat-label>{{'meeting-room.selectBuilding' | translate}}</mat-label>
        <mat-select formControlName="building">
          <mat-option value="option1">{{'meeting-room.building' | translate}} </mat-option>
          <mat-option value="option2">{{'meeting-room.building1' | translate}}</mat-option>
        </mat-select>
      </mat-form-field>
    <br>
      <mat-slide-toggle class="toggle" formControlName="projector">{{'meeting-room.projector' | translate}}
      </mat-slide-toggle>
    <br>
    <p>
      <mat-form-field class="field">
        <mat-label>{{'meeting-room.seats' | translate}}</mat-label>
        <input  type="number" formControlName="seats"
          matInput placeholder="{{'meeting-room.placeholderSeats' | translate}}">
      </mat-form-field>
    </p>
    <button mat-raised-button color="warn">{{'meeting-room.saveButton' | translate}}</button>
  </mat-card>
</form>
`
})

export class MeetingRoomComponent {
  public language: string;

  profileForm = new FormGroup({
  building : new FormControl(''),
  name : new FormControl(''),
  projector : new FormControl(''),
  seats : new FormControl(''),
  });

  constructor(private readonly translate: TranslateService) {
    this.language = this.translate.currentLang;
  }

   public onLanguageChange() {
    this.translate.use(this.language === 'en' ? 'hu' : 'en');
    this.language = this.translate.currentLang;
  }
}
