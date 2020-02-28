import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
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
      table-layout: fixed;
    }
    .column {
      font-size: larger;
    }
    th.mat-header-cell {
      text-align: left;
      max-width: 300px!important;
    }
  `],
  template: `
     <div class="row justify-content-center" class="container">
    <mat-form-field>
    <input matInput type="text" (keyup)="doFilter($event.target.value)"
    placeholder="{{'search-bar.search' | translate}}">
    </mat-form-field>
      <table mat-table [dataSource]="dataSource" class="mat-elevation-z8"
        matSort matSortActive="id" matSortDirection="desc" matSortDisableClear>
        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef class="column" mat-sort-header>
            {{'profile.id' | translate}} </th>
          <td mat-cell  *matCellDef="let user"> {{user.id}} </td>
        </ng-container>
        <ng-container matColumnDef="email">
          <th mat-header-cell *matHeaderCellDef class="column" mat-sort-header>
            {{'profile.email' | translate}} </th>
          <td mat-cell *matCellDef="let user">{{user.username}}</td>
        </ng-container>
        <ng-container matColumnDef="role">
          <th mat-header-cell *matHeaderCellDef class="column" mat-sort-header>
            {{'profile.role' | translate}} </th>
          <td mat-cell *matCellDef="let user" [ngSwitch]="user.role">
            <p *ngSwitchCase="'ADMIN'">{{'user-verification-dialog.admin' | translate}}</p>
            <p *ngSwitchCase="'USER'">{{'user-verification-dialog.user' | translate}}</p>
            <p *ngSwitchCase="'READER'">{{'user-verification-dialog.reader' | translate}}</p>
            <p *ngSwitchDefault>{{'user-verification-dialog.pending' | translate}}</p>
          </td>
        </ng-container>
        <ng-container matColumnDef="action">
          <th mat-header-cell *matHeaderCellDef class="column">{{'profile.action' | translate}}</th>
          <td mat-cell *matCellDef="let user">
          <button *ngIf="user.username !== currentAdmin.username"
          mat-icon-button color="primary" (click)="deleteDialog(user.id)">
          <mat-icon aria-label="Delete Icon">
            delete
          </mat-icon>
           </button>
           <button *ngIf="user.role === 'PENDING'"  mat-icon-button color="primary">
          <mat-icon aria-label="User"(click)="verificationDialog(user.id)">
            perm_identity
          </mat-icon>
          </button>
          </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
      <mat-paginator class="mat-elevation-z8"
        [pageSize]="5"
        [pageSizeOptions]="[10, 25, 50]"
        showFirstLastButtons>
      </mat-paginator>
      </div>
  `
})

export class UsersTableComponent implements OnInit, OnDestroy, AfterViewInit {
  public displayedColumns: string[] = ['email', 'role', 'action'];
  public deleteUnsub: Subscription;
  public verifyUnsub: Subscription;
  public subs: Subscription;
  protected currentAdmin: UserToken = {} as UserToken;
  public dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();
  public dataSub: Subscription;
  @ViewChild(MatSort) public sort: MatSort;
  @ViewChild(MatPaginator) public paginator: MatPaginator;

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
    this.dataSource.paginator = this.paginator;
    this.userService.userSub.subscribe((users) => this.dataSource.data = users);
   }

   public ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
   }

   public doFilter = (value: string) => {
    this.dataSource.filter = value.trim()
   .toLocaleLowerCase();
   }

   public deleteDialog(id: string) {
    const dialogRef = this.dialog.open(UserDeleteDialogComponent, {
      disableClose: true,
      height: '35%',
      width: '30%'
    } );
    this.deleteUnsub = dialogRef.afterClosed()
    .subscribe((result) => {
      if (result === 'true') {
        this.deleteUser(id);
      }
    });
   }

   public verificationDialog(id: string) {
    const dialogRef = this.dialog.open(UserVerificationDialogComponent, {
      disableClose: true,
      height: '35%',
      width: '30%'
    });
    this.verifyUnsub = dialogRef.afterClosed()
    .subscribe((roleSet) => {
      if (roleSet !== 'false') {
      this.verifyUser(id, roleSet);
      }
    });
   }

   public verifyUser(id: string, roleSet: string) {
    this.userService
    .userRoleSet(id, roleSet)
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

   public ngOnDestroy(): void {
     if (this.dataSub) {
      this.dataSub.unsubscribe();
     }
     if (this.deleteUnsub) {
      this.deleteUnsub.unsubscribe();
     }
     if (this.verifyUnsub) {
      this.verifyUnsub.unsubscribe();
     }
     if (this.subs) {
      this.subs.unsubscribe();
     }
   }
}
