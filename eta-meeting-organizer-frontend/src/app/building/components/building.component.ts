import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { Building } from '~/app/models/building.model';
import { BuildingDeleteDialogComponent } from '~/app/shared/Modals/building-delete-dialog';
import { BuildingRegisterComponent } from '~/app/shared/Modals/building-register.component';
import { BuildingUpdateDialogComponent } from '~/app/shared/Modals/building-update-dialog';
import { BuildingService } from './../../shared/services/building.service';

@Component({
  selector: 'app-building-list',
  styles: [`
    .center {
      text-align: center;
      font-size: larger;
    }

    table {
      width: 100%;
    }

    .addButton {
      width: 100%;
    }
  `],
  template: `
     <button mat-icon-button color="primary"
          (click)="postDialog()">
          <mat-icon>add</mat-icon>
    </button>
    <div class="row justify-content-center" class="container">
      <table mat-table [dataSource]="building$ | async" class="mat-elevation-z8">
      <ng-container matColumnDef="buildingName">
          <th mat-header-cell *matHeaderCellDef class="center">{{'building.buildingName' | translate}}</th>
          <td mat-cell *matCellDef="let building"> {{building.buildingName}} </td>
        </ng-container>
        <ng-container matColumnDef="city">
          <th mat-header-cell *matHeaderCellDef class="center">{{'building.city' | translate}}</th>
          <td mat-cell *matCellDef="let building"> {{building.city}} </td>
        </ng-container>
        <ng-container matColumnDef="address">
          <th mat-header-cell *matHeaderCellDef class="center"> {{'building.address' | translate}} </th>
          <td mat-cell *matCellDef="let building"> {{building.address}} </td>
        </ng-container>
        <ng-container matColumnDef="action">
          <th mat-header-cell *matHeaderCellDef></th>
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
        <tr mat-row *matRowDef="let row; columns: displayedColumns;" align="center"></tr>
      </table>
    </div>
  `
})

export class BuildingComponent implements OnInit, OnDestroy {
  public building$: Observable<Building[]>;
  public displayedColumns: string[] = ['buildingName', 'city', 'address', 'action'];
  public deleteUnsub: Subscription;
  public updateUnsub: Subscription;
  public postUnsub: Subscription;
  constructor(private readonly buildingService: BuildingService,
              private readonly dialog: MatDialog) { }

   public ngOnInit() {
     this.buildingService.getAllBuildings();
     this.building$ = this.buildingService
     .buildingSub;
   }

  public postDialog(): void {
    const dialogRef = this.dialog.open(BuildingRegisterComponent, {
      width: '400px',
    });
    this.postUnsub = dialogRef.afterClosed()
    .subscribe();
  }

  public updateDialog(buildingData: Building) {
    const dialogRef = this.dialog.open(BuildingUpdateDialogComponent, {
      data: buildingData
    });
    this.updateUnsub = dialogRef.afterClosed()
    .subscribe();
  }

  public deleteDialog(id: number) {
    const dialogRef = this.dialog.open(BuildingDeleteDialogComponent);
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
