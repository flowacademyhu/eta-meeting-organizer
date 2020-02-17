import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';
import { User } from './../../models/user.model';
import { UserDeleteDialogComponent } from './../../shared/Modals/user-delete-dialog';

@Component({
  selector: 'app-users-table',
  styles: [`
    .row {
      min-height: calc(100vh - 60px);
    }
    table {
      width: 100%;
    }
  `],
  template: `
  <div class="row justify-content-center">
      <table mat-table [dataSource]="users$ | async" class="mat-elevation-z8">
        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef>{{'profile.id' | translate}} </th>
          <td mat-cell  *matCellDef="let user"> {{user.id}} </td>
        </ng-container>
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef> {{'profile.username' | translate}} </th>
          <td mat-cell *matCellDef="let user"> {{user.name}} </td>
        </ng-container>
        <ng-container matColumnDef="email">
          <th mat-header-cell *matHeaderCellDef> {{'profile.email' | translate}} </th>
          <td mat-cell *matCellDef="let user">{{user.email}}</td>
        </ng-container>
        <ng-container matColumnDef="role">
          <th mat-header-cell *matHeaderCellDef> {{'profile.role' | translate}} </th>
          <td mat-cell *matCellDef="let user">{{user.role}}</td>
        </ng-container>
        <ng-container matColumnDef="delete">
          <th mat-header-cell *matHeaderCellDef> {{'profile.delete' | translate}} </th>
          <td mat-cell *matCellDef="let user">
            <button mat-raised-button color="primary"
             (click)="openDialog(user.id)">{{'profile.delete' | translate}}</button>
          </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;" ></tr>
      </table>
    </div>
  `
})

export class UsersTableComponent {
  public users$: Observable<User[]>;
  public displayedColumns: string[] = ['id', 'name', 'email', 'role', 'delete'];

  constructor(private readonly api: ApiCommunicationService,
              private readonly dialog: MatDialog) {
    this.users$ = this.api.user()
    .getUsers();
   }

   public openDialog(id: number) {
    const dialogRef = this.dialog.open(UserDeleteDialogComponent);
    dialogRef.afterClosed()
    .subscribe((result) => {
      if (result === 'true') {
        this.deleteUser(id);
      }
    });
   }

   public deleteUser(id: number) {
    this.api.user()
    .deleteUserById(id)
    .subscribe((data) => {
      console.log(data);
    });
   }
   
}
