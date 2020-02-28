import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Building } from '~/app/models/building.model';
import { BuildingDeleteDialogComponent } from '~/app/shared/Modals/building-delete-dialog';
import { BuildingRegisterComponent } from '~/app/shared/Modals/building-register.component';
import { BuildingUpdateDialogComponent } from '~/app/shared/Modals/building-update-dialog';
import { BuildingService } from './../../shared/services/building.service';

@Component({
  selector: 'app-building-list',
  styles: [`
    table {
      width: 100%;
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
     <button mat-icon-button color="primary"
          (click)="postDialog()">
          <mat-icon>add</mat-icon>
    </button>
    <mat-form-field>
    <input matInput type="text" (keyup)="doFilter($event.target.value)"
     placeholder="{{'search-bar.search' | translate}}">
  </mat-form-field>
      <table mat-table [dataSource]="dataSource" class="mat-elevation-z8" matSort>
      <ng-container matColumnDef="buildingName">
          <th mat-header-cell *matHeaderCellDef class="column" mat-sort-header>
            {{'building.buildingName' | translate}}</th>
          <td mat-cell *matCellDef="let building"> {{building.buildingName}} </td>
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
          <th mat-header-cell *matHeaderCellDef class="column" mat-sort-header> {{'building.edit' | translate}} </th>
          <td mat-cell *matCellDef="let building">
           <button mat-icon-button color="accent" (click)="updateDialog(building)">
          <mat-icon aria-label="Edit">
            edit
          </mat-icon>
          </button>
          <button mat-icon-button color="primary" (click)="deleteDialog(building.id)">
          <mat-icon aria-label="Delete Icon">
            delete
          </mat-icon>
           </button>
          </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
      <mat-paginator
        [pageSize]="5"
        [pageSizeOptions]="[5, 10, 20]"
        showFirstLastButton>
      </mat-paginator>
    </div>
  `
})

export class BuildingComponent implements OnInit, OnDestroy, AfterViewInit {
  public displayedColumns: string[] = ['buildingName', 'city', 'address', 'delete'];
  public deleteUnsub: Subscription;
  public updateUnsub: Subscription;
  public postUnsub: Subscription;
  public dataSource: MatTableDataSource<Building> = new MatTableDataSource<Building>();
  public dataSub: Subscription;

  @ViewChild(MatSort) public sort: MatSort;
  @ViewChild(MatPaginator) public paginator: MatPaginator;

  constructor(private readonly dialog: MatDialog,
              private readonly buildingService: BuildingService) {
  }

  public ngOnInit() {
    this.buildingService.getAllBuildings();
    this.dataSource.paginator = this.paginator;
    this.buildingService.buildingSub
    .subscribe((buildings) => this.dataSource.data = buildings);
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
      height: '65%',
      width: '25%',
    });
    this.postUnsub = dialogRef.afterClosed()
    .subscribe();
  }

  public updateDialog(buildingData: Building) {
    const dialogRef = this.dialog.open(BuildingUpdateDialogComponent, {
      disableClose: true,
      height: '65%',
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
      width: '30%'
    });
    this.deleteUnsub = dialogRef.afterClosed()
    .subscribe((result) => {
      if (result === 'true') {
        this.deleteBuilding(id);
      }
    });
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
   }
}
