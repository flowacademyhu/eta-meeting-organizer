import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { Building } from '~/app/models/building.model';
import { BuildingRegisterComponent } from '~/app/shared/Modals/building-register.component';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';
import { BuildingService } from '~/app/shared/services/building.service';

@Component({
  selector: 'app-building-list',
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
     <button mat-icon-button color="primary"
          (click)="openDialog()">
          <mat-icon>add</mat-icon>
    </button>
    <div fxLayout fxLayoutAlign="center center">
    <mat-form-field fxFlex="20%">
    <input matInput type="text" (keyup)="doFilter($event.target.value)" placeholder="Filter">
  </mat-form-field>
      <table mat-table [dataSource]="dataSource" class="mat-elevation-z8" matSort>
        <ng-container matColumnDef="city">
          <th mat-header-cell *matHeaderCellDef class="center" mat-sort-header>{{'building.city' | translate}} </th>
          <td mat-cell *matCellDef="let building"> {{building.city}} </td>
        </ng-container>
        <ng-container matColumnDef="address">
          <th mat-header-cell *matHeaderCellDef class="center" mat-sort-header> {{'building.address' | translate}} </th>
          <td mat-cell *matCellDef="let building"> {{building.address}} </td>
        </ng-container>
        <ng-container matColumnDef="delete">
          <th mat-header-cell *matHeaderCellDef class="center" mat-sort-header> {{'building.edit' | translate}} </th>
          <td mat-cell *matCellDef="let building">
          <button mat-icon-button color="accent">
            <mat-icon>edit</mat-icon>
          </button>
          <button mat-icon-button color="primary">
            <mat-icon>delete</mat-icon>
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

  public building$: Observable<Building[]>;

  public displayedColumns: string[] = ['city', 'address', 'delete'];

  @ViewChild(MatSort) public sort: MatSort;
  @ViewChild(MatPaginator) public paginator: MatPaginator;

  constructor(private readonly api: ApiCommunicationService,
              private readonly dialog: MatDialog,
              private readonly repoService: BuildingService) {
                  this.building$ = this.api.building()
                                           .getBuildings();
  }

  public dataSource: MatTableDataSource<Building> = new MatTableDataSource<Building>();

  public dataSub: Subscription;

  public ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSub = this.repoService.getBuildings()
      .subscribe((res) => {
        this.dataSource.data = (res as unknown as Building[]);
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

  public openDialog(): void {
    this.dialog.open(BuildingRegisterComponent, {
      width: '400px',
    });
  }

  public ngOnDestroy() {
    this.dataSub.unsubscribe();
  }
}
