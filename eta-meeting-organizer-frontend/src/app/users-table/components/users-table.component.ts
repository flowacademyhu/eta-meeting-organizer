import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { User } from './../../models/user.model';
import { UserDeleteDialogComponent } from './../../shared/Modals/user-delete-dialog';
import { UserService } from './../../shared/services/user.service';

@Component({
  selector: 'app-users-table',
  styles: [`
    table {
      width: 100%;
    }
    .center {
      text-align: center;
      font-size: larger;
    }
  `],
  template: `
  <div class="row justify-content-center">
      <table mat-table [dataSource]="users$ | async" class="mat-elevation-z8">
        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef class="center">{{'profile.id' | translate}} </th>
          <td mat-cell  *matCellDef="let user"> {{user.id}} </td>
        </ng-container>
        <ng-container matColumnDef="email">
          <th mat-header-cell *matHeaderCellDef class="center"> {{'profile.email' | translate}} </th>
          <td mat-cell *matCellDef="let user">{{user.username}}</td>
        </ng-container>
        <ng-container matColumnDef="role">
          <th mat-header-cell *matHeaderCellDef class="center"> {{'profile.role' | translate}} </th>
          <td mat-cell *matCellDef="let user">{{user.role}}</td>
        </ng-container>
        <ng-container matColumnDef="action">
          <th mat-header-cell *matHeaderCellDef></th>
          <td mat-cell *matCellDef="let user">
          <button mat-icon-button color="primary" (click)="openDialog(user.id)">
          <mat-icon aria-label="Delete Icon">
            delete
          </mat-icon>
           </button>
           <button *ngIf="user.role === 'USER'"  mat-icon-button color="primary">
          <mat-icon aria-label="User">
            perm_identity
          </mat-icon>
          </button>
          </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;" align="center" ></tr>
      </table>
    </div>
  `
})

export class UsersTableComponent implements OnInit {
  public users$: Observable<User[]>;
  public displayedColumns: string[] = ['id', 'email', 'role', 'action'];

  constructor(private readonly userService: UserService,
              private readonly dialog: MatDialog) { }

   public ngOnInit() {
    this.userService.getAllUsers();
    this.users$ = this.userService
    .userSub;
   }

   public openDialog(id: string) {
    const dialogRef = this.dialog.open(UserDeleteDialogComponent);
    dialogRef.afterClosed()
    .subscribe((result) => {
      if (result === 'true') {
        this.deleteUser(id);
      }
    });
   }

   public deleteUser(id: string) {
    this.userService.deleteUser(id)
    .subscribe(() => {
      this.userService
      .getAllUsers();
      });
   }
}
