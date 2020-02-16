import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';
import { User } from './../../models/user.model';

@Component({
  selector: 'app-users-table',
  template: `
  <div class="row justify-content-center">
      <table mat-table [dataSource]="users$ | async" class="mat-elevation-z8">
        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef>{{'profile.id' | translate}} </th>
          <td mat-cell *matCellDef="let user"> {{user.id}} </td>
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
          <td mat-cell *matCellDef="let user">{{user.role}</td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </div>
  `
})

export class UsersTableComponent {
  public users$: Observable<User[]>;

  constructor(private readonly api: ApiCommunicationService) {
    this.users$ = this.api.user()
    .getUsers();
   }

   public displayedColumns: string[] = ['id', 'name', 'email', 'role'];
}