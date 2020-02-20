import { Component, OnDestroy, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Observable, Subscription} from 'rxjs';
import {Building} from '~/app/models/building.model';
import { BuildingDeleteComponent } from '~/app/shared/Modals/building-delete.component';
import {BuildingRegisterComponent} from '~/app/shared/Modals/building-register.component';
import { BuildingService } from '~/app/shared/services/building.service';

@Component({
  selector: 'app-building-list',
  styles: [`
    .row {
      min-height: calc(100vh - 60px);
    }

    table {
      width: 100%;
    }
  `],
  template: `
     <button mat-icon-button color="primary"
          (click)="openDialog()">
          <mat-icon>add</mat-icon>
    </button>
    <div class="row justify-content-center">
      <table mat-table [dataSource]="building$ | async" class="mat-elevation-z8">
        <ng-container matColumnDef="city">
          <th mat-header-cell *matHeaderCellDef> </th>
          <td mat-cell *matCellDef="let building"> {{building.city}} </td>
        </ng-container>
        <ng-container matColumnDef="address">
          <th mat-header-cell *matHeaderCellDef>  </th>
          <td mat-cell *matCellDef="let building"> {{building.address}} </td>
        </ng-container>
        <ng-container matColumnDef="delete">
          <th mat-header-cell *matHeaderCellDef>  </th>
          <td mat-cell *matCellDef="let building">
          <button mat-icon-button color="accent">
            <mat-icon>edit</mat-icon>
          </button>
          <button mat-icon-button color="primary" (click)="deleteDialog(building.id)">
            <mat-icon>delete</mat-icon>
          </button>
          </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </div>
  `
})

export class BuildingComponent implements OnInit, OnDestroy{
  public building$: Observable<Building[]>;
  public unsubFromDialog: Subscription;
  public displayedColumns: string[] = ['city', 'address', 'delete'];

  constructor(private readonly dialog: MatDialog,
              private readonly buildingService: BuildingService) { }

  public ngOnInit() {
    this.buildingService.getAllBuildings();
    this.building$ = this.buildingService
    .buildingSub;
    }

  public openDialog(): void {
    this.dialog.open(BuildingRegisterComponent, {
      width: '400px',
    });
  }
  public deleteDialog(id: number) {
    const dialogRef = this.dialog.open(BuildingDeleteComponent);
    this.unsubFromDialog = dialogRef.afterClosed()
    .subscribe((result) => {
      if (result === 'true') {
        this.deleteBuilding(id);
      }
    });
  }

  public ngOnDestroy() {
    this.unsubFromDialog.unsubscribe();
  }

  public deleteBuilding(id: number) {
    this.buildingService.deleteBuilding(id)
    .subscribe(() => {
      this.buildingService
      .getAllBuildings();
    });
  }
}
