import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { UserVerificationDialogComponent } from '~/app/shared/Modals/user-verification-dialog';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';
import { User } from './../../models/user.model';
import { UserDeleteDialogComponent } from './../../shared/Modals/user-delete-dialog';
import { UserService } from './../../shared/services/user.service';

@Component({
  selector: 'app-users-table',
  styles: [`
table {
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
}

th.mat-header-cell {
    text-align: left;
    max-width: 300px!important;
}

    .row {
      min-height: calc(100vh - 60px);
    }

  `],
  template: `
    <div>
    <mat-form-field>
    <input matInput type="text" (keyup)="doFilter($event.target.value)" placeholder="Filter">
    </mat-form-field>
      <table mat-table [dataSource]="dataSource" class="mat-elevation-z8" matSort>
        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef mat-sort-header> {{'profile.id' | translate}} </th>
          <td mat-cell  *matCellDef="let user"> {{user.id}} </td>
        </ng-container>
        <ng-container matColumnDef="email">
          <th mat-header-cell *matHeaderCellDef mat-sort-header> {{'profile.email' | translate}} </th>
          <td mat-cell *matCellDef="let user"> {{user.username}} </td>
        </ng-container>
        <ng-container matColumnDef="role">
          <th mat-header-cell *matHeaderCellDef mat-sort-header> {{'profile.role' | translate}} </th>
          <td mat-cell *matCellDef="let user"> {{user.role}} </td>
        </ng-container>
        <ng-container matColumnDef="action">
          <th mat-header-cell *matHeaderCellDef></th>
          <td mat-cell *matCellDef="let user">
          <button mat-icon-button color="primary" (click)="deleteDialog(user.id)">
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
        <tr mat-row *matRowDef="let row; columns: displayedColumns;" ></tr>
      </table>
      <mat-paginator
        [pageSize]="5"
        [pageSizeOptions]="[5, 10, 20]"
        showFirstLastButton>
      </mat-paginator>

  `
})

export class UsersTableComponent implements OnInit, OnDestroy, AfterViewInit {
  public users$: Observable<User[]>;
  public displayedColumns: string[] = ['id', 'email', 'role', 'action'];

  @ViewChild(MatSort) public sort: MatSort;
  @ViewChild(MatPaginator) public paginator: MatPaginator;

  constructor(private readonly api: ApiCommunicationService,
              private readonly userService: UserService,
              private readonly dialog: MatDialog) {
      this.users$ = this.api.user()
    .getUsers();
     }

     public dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();

     public dataSub: Subscription;

   public ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSub = this.userService.getUsers()
      .subscribe((res) => {
    this.dataSource.data = (res as unknown as User[]);
  });
    this.userService.getAllUsers();
    this.users$ = this.userService
    .userSub;
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

   public ngOnDestroy() {
    this.dataSub.unsubscribe();
  }

}
