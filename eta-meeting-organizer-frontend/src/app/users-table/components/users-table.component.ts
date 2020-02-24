import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { UserVerificationDialogComponent } from '~/app/shared/Modals/user-verification-dialog';
import { UserToken } from '~/app/shared/models/user-token.model';
import { AuthService } from '~/app/shared/services/auth.service';
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
          <button *ngIf="user.username !== currentAdmin.username"
          mat-icon-button color="primary" (click)="deleteDialog(user.id)">
          <mat-icon aria-label="Delete Icon">
            delete
          </mat-icon>
           </button>
           <button *ngIf="user.verifiedByAdmin == false"  mat-icon-button color="primary">
          <mat-icon aria-label="User"(click)="verificationDialog(user.id)">
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
  protected currentAdmin: UserToken = {} as UserToken;
  protected subs: Subscription;

  constructor(private readonly userService: UserService,
              private readonly dialog: MatDialog,
              private readonly authService: AuthService) {
    this.subs = this.authService.user.pipe(take(1))
    .subscribe((data) => {
    this.currentAdmin = data;
    });
  }

   public ngOnInit() {
    this.userService.getAllUsers();
    this.users$ = this.userService
    .userSub;
   }

   public deleteDialog(id: string) {
    const dialogRef = this.dialog.open(UserDeleteDialogComponent);
    dialogRef.afterClosed()
    .subscribe((result) => {
      if (result === 'true') {
        this.deleteUser(id);
      }
    });
   }

   public verificationDialog(id: string) {
    const dialogRef = this.dialog.open(UserVerificationDialogComponent);
    dialogRef.afterClosed()
    .subscribe((result) => {
      if (result === 'true') {
        this.verifyUser(id);
      }
    });
   }

   public verifyUser(id: string) {
     this.userService
     .updateUser(id)
     .subscribe(() => {
      this.userService
      .getAllUsers();
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
