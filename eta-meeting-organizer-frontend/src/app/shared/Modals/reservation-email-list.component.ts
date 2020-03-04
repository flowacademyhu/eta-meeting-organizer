import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Participant } from '~/app/models/participant.model';

@Component({
  selector: 'app-reservation-email-list',
  styles: [`
  .align-title {
    padding-top: 5%;
    height: 100px;
    margin: 0 auto;
    font-size: 225%;
    text-align: center;
  }
  .align-content{
    height: 13.5cm;
    font-size: 160%;
    margin: 0 auto;
    text-align: center;
  }
  mat-form-field {
    width: 100%;
    text-align: center;
    margin: 0 auto;
  }
  .button {
    width: 80%;
    margin: 0 auto;
    border:1px solid;
    border-color: black;
    font-size: 100%;
    margin: 20px;
    text-align: center;
  }
  mat-icon {
    vertical-align: middle;
    display: inline-flex;
  }
  `],
 template: `
<mat-dialog-content class="align-title">{{'reservation.participantButton' | translate}}</mat-dialog-content>
<mat-dialog-content class="align-content">
<form [formGroup]="emailListForm">
  <mat-form-field>
      <mat-label>{{'reservation.email' | translate}}</mat-label>
        <input matInput type="email" name="participant" formControlName="participant" [email]="true">
        <mat-error>{{'validation.email' | translate}}</mat-error>
  </mat-form-field>
  <button class="button"
       mat-raised-button
       [disabled]="emailListForm.invalid"
       cdkFocusInitial
       color="primary"
       (click)="addEmail()"
       >{{'reservation.add' | translate}}</button>
</form>
<mat-card>
      <mat-label>{{'reservation.participantList' | translate}}</mat-label>
      <mat-card-content>
      <br>
      <p *ngFor="let participant of participants">
        {{participant.email}}
      <button mat-button color="warn" (click)="deleteEmail(participant)">
        <mat-icon>
        clear
        </mat-icon>
      </button>
      </p>
      </mat-card-content>
  </mat-card>
    <button class="button"
      mat-raised-button
      (click)="close()"
      color="primary">{{'reservation.back' | translate}}</button>
</mat-dialog-content>
`,
})

export class ReservationEmailListComponent {

  public participants: Participant[] = [];

  @Output()
  public closeOutput: EventEmitter<Participant[]> = new EventEmitter();

  public emailListForm: FormGroup = new FormGroup({
    participant : new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {participants: Participant[]},
    public dialogRef: MatDialogRef<ReservationEmailListComponent>,
    private readonly _snackBar: MatSnackBar,
    private readonly translate: TranslateService) {
      if (data.participants !== null) {
        this.participants = data.participants;
      }
    }

  public addEmail() {
    this.participants.push(new Participant(this.emailListForm.controls.participant.value));
    this.emailListForm.controls.participant.reset();
  }

  public deleteEmail(participant: Participant) {
    const participantToBeDeleted = this.participants.indexOf(participant);
    this.participants.splice(participantToBeDeleted, 1);
  }

  public close() {
    this.closeOutput.emit(this.participants);
    this.dialogRef.close();
  }

  public openSnackBar() {
    this._snackBar.open(this.translate
      .instant(`snackbar-reservation.reservationModificationOK`), '', {
      duration: 2500
    });
  }
}
