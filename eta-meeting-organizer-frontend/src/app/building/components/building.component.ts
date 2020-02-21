import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {Building} from '~/app/models/building.model';
import {BuildingRegisterComponent} from '~/app/shared/Modals/building-register.component';
import {ApiCommunicationService} from '~/app/shared/services/api-communication.service';
import { BuildingDeleteDialogComponent } from '~/app/shared/Modals/building-delete-dialog';

@Component({
  selector: 'app-building-list',
  styles: [`
    .row {
      min-height: calc(100vh - 60px);
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
        <ng-container matColumnDef="action">
          <th mat-header-cell *matHeaderCellDef></th>
          <td mat-cell *matCellDef="let building">
           <button mat-icon-button color="accent">
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
    </div>
  `
})

export class BuildingComponent {
  public building$: Observable<Building[]>;

  constructor(private readonly api: ApiCommunicationService,
              private readonly dialog: MatDialog,
  ) {  this.building$ = this.api.building()
    .getBuildings();
  }

  public displayedColumns: string[] = ['city', 'address', 'action'];

  public openDialog(): void {
    this.dialog.open(BuildingRegisterComponent, {
      width: '400px',
    });
  }
  public deleteDialog(id: number) {
    const dialogRef = this.dialog.open(BuildingDeleteDialogComponent);
    dialogRef.afterClosed()
    .subscribe((result) => {
      if (result === 'true') {
        this.deleteBuilding(id);
      }
    });
   }

  public deleteBuilding(id: number) {
    this.api.building()
    .deleteMeetingRoomById(id)
    .subscribe();
   }
}
