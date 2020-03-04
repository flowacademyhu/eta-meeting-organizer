import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { MatCheckboxChange } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Building } from '~/app/models/building.model';
import { BuildingDeleteDialogComponent } from '~/app/shared/Modals/building-delete-dialog';
import { BuildingRegisterComponent } from '~/app/shared/Modals/building-register.component';
import { BuildingUpdateDialogComponent } from '~/app/shared/Modals/building-update-dialog';
import { BuildingCheckboxComponent } from './../../shared/Modals/building-checkbox-delete.component';
import { BuildingService } from './../../shared/services/building.service';

@Component({
  selector: 'app-building-list',
  styles: [`
    table {
      width: 100%;
      table-layout: fixed;
    }
    .column {
      font-size: larger;
    }
    .addButton {
      width: 100%;
    }
  `],
  template: `
  <div class="row justify-content-center" class="container">
      <button mat-icon-button color="primary" (click)="postDialog()">
        <mat-icon>
          add
      </mat-icon>
    </button>
    <mat-form-field>
    <input matInput type="text" (keyup)="doFilter($event.target.value)"
     placeholder="{{'search-bar.search' | translate}}">
    </mat-form-field>
    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8"
      matSort matSortActive="id" matSortDirection="desc" matSortDisableClear>

      <ng-container matColumnDef="checkbox">
        <th mat-header-cell  [ngStyle]="{textAlign: 'center'}" *matHeaderCellDef class="column">
          <button mat-icon-button  [disabled]="this.checkedArr.length === 0"
            [color]="(this.checkedArr.length > 0) ? 'primary' : 'accent'"
            (click)="deleteByCheckboxDialog(this.checkedArr)">
            <mat-icon>delete_forever</mat-icon>
          </button>
        </th>
        <div >
        <td mat-cell [ngStyle]="{textAlign: 'center'}" *matCellDef="let building">
          <mat-checkbox (change)="checkCheckBox(building.id, $event)"></mat-checkbox>
        </td>
        </div>
      </ng-container>

      <ng-container matColumnDef="id">
        <th mat-header-cell *matHeaderCellDef class="column" mat-sort-header>{{'profile.id' | translate}}</th>
        <td mat-cell  *matCellDef="let building">{{building.id}}</td>
      </ng-container>
      <ng-container matColumnDef="buildingName">
        <th mat-header-cell *matHeaderCellDef class="column" mat-sort-header>
          {{'building.buildingName' | translate}}
        </th>
          <td mat-cell *matCellDef="let building"> {{building.buildingName}}</td>
      </ng-container>
      <ng-container matColumnDef="city">
        <th mat-header-cell *matHeaderCellDef class="column" mat-sort-header>{{'building.city' | translate}}</th>
          <td mat-cell *matCellDef="let building"> {{building.city}} </td>
      </ng-container>
      <ng-container matColumnDef="address">
        <th mat-header-cell *matHeaderCellDef class="column" mat-sort-header> {{'building.address' | translate}} </th>
          <td mat-cell *matCellDef="let building"> {{building.address}} </td>
      </ng-container>
      <ng-container matColumnDef="delete">
        <th mat-header-cell *matHeaderCellDef class="column" mat-sort-header> {{'building.action' | translate}} </th>
          <td mat-cell *matCellDef="let building">
            <button mat-icon-button color="accent" (click)="updateDialog(building)">
              <mat-icon aria-label="Edit">edit</mat-icon>
            </button>
            <button mat-icon-button color="primary" (click)="deleteDialog(building.id)">
              <mat-icon aria-label="Delete Icon">delete</mat-icon>
            </button>
          </td>
      </ng-container>
      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
    <mat-paginator
      class="mat-elevation-z8"
      [pageSize]="10"
      [pageSizeOptions]="[10, 25, 50]"
      showFirstLastButtons>
    </mat-paginator>
  </div>
  `
})

export class BuildingComponent implements OnInit, OnDestroy, AfterViewInit {
  public displayedColumns: string[] = ['checkbox', 'buildingName', 'city', 'address', 'delete'];
  public deleteUnsub: Subscription;
  public updateUnsub: Subscription;
  public unsubFromCheckbox: Subscription;
  public postUnsub: Subscription;
  public dataSource: MatTableDataSource<Building> = new MatTableDataSource<Building>();
  public dataSub: Subscription;
  public checkedArr: number[] = [];
  public dialogRef: MatDialogRef<BuildingCheckboxComponent>;

  @ViewChild(MatSort) public sort: MatSort;
  @ViewChild(MatPaginator) public paginator: MatPaginator;

  constructor(private readonly dialog: MatDialog,
              private readonly buildingService: BuildingService) {
  }

  public checkCheckBox(Id: number, event: MatCheckboxChange) {
    const checked = event.checked;
    if (checked) {
     this.checkedArr.push(Id);
    } else {
     const index = this.checkedArr.findIndex((building) => building === Id);
     this.checkedArr.splice(index, 1);
    }
   }

  public ngOnInit() {
    this.buildingService.getAllBuildings();
    this.dataSource.paginator = this.paginator;
    this.buildingService.buildingSub
    .subscribe((buildings) => this.dataSource.data = buildings);
  }

  public deleteByCheckboxDialog(id: number[]) {
    const dialogRef = this.dialogRef = this.dialog.open(BuildingCheckboxComponent, {
      disableClose: true,
      height: '35%',
      width: '30%',
      data: id
    });
    dialogRef.afterClosed()
    .subscribe(() => {
    this.buildingService.getAllBuildings();
    this.checkedArr = [];
    });
  }

  public ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

 public doFilter = (value: string) => {
   this.dataSource.filter = value.trim()
    .toLocaleLowerCase();
 }

  public postDialog(): void {
    const dialogRef = this.dialog.open(BuildingRegisterComponent, {
      disableClose: true,
      height: '75%',
      width: '25%',
    });
    this.postUnsub = dialogRef.afterClosed()
    .subscribe();
  }

  public updateDialog(buildingData: Building) {
    const dialogRef = this.dialog.open(BuildingUpdateDialogComponent, {
      disableClose: true,
      height: '75%',
      width: '25%',
      data: buildingData
    });
    this.updateUnsub = dialogRef.afterClosed()
    .subscribe();
  }

  public deleteDialog(id: number) {
    const dialogRef = this.dialog.open(BuildingDeleteDialogComponent, {
      disableClose: true,
      height: '35%',
      width: '30%',
      data: id
    });
    this.deleteUnsub = dialogRef.afterClosed()
    .subscribe();
   }

  public deleteBuilding(id: number) {
    this.buildingService
    .deleteBuilding(id)
    .subscribe(() => {
      this.buildingService
      .getAllBuildings();
    });
   }

   public ngOnDestroy(): void {
    if (this.dataSub) {
      this.dataSub.unsubscribe();
    }
    if (this.deleteUnsub) {
      this.deleteUnsub.unsubscribe();
    }
    if (this.updateUnsub) {
      this.updateUnsub.unsubscribe();
    }
    if (this.postUnsub) {
      this.postUnsub.unsubscribe();
    }
    if (this.unsubFromCheckbox) {
      this.unsubFromCheckbox.unsubscribe();
    }
   }
}
