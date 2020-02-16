import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Building } from '~/app/models/building.model';
import { BuildingRegisterComponent } from '~/app/shared/Modals/building-register.component';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';

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

  <button mat-raised-button color="warn"
          class="addButton"
          (click)="openDialog()">
          {{'building.add' | translate}}
  </button>
    <div class="row justify-content-center">
      <table mat-table [dataSource]="building$ | async" class="mat-elevation-z8">
        <ng-container matColumnDef="city">
          <th mat-header-cell *matHeaderCellDef>{{'building.city' | translate}} </th>
          <td mat-cell *matCellDef="let building"> {{building.city}} </td>
        </ng-container>
        <ng-container matColumnDef="address">
          <th mat-header-cell *matHeaderCellDef> {{'building.address' | translate}} </th>
          <td mat-cell *matCellDef="let building"> {{building.address}} </td>
        </ng-container>
        <ng-container matColumnDef="delete">
          <th mat-header-cell *matHeaderCellDef> {{'building.delete' | translate}} </th>
          <td mat-cell *matCellDef="let building">
            <button mat-raised-button color="warn">
              {{'building.deleteButton' | translate}}
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
  ) {
    this.building$ = this.api.building()
    .getBuildings();
   }

  public displayedColumns: string[] = ['city', 'address', 'delete'];

  public openDialog(): void {
    this.dialog.open(BuildingRegisterComponent, {
      width: '400px',

    });
  }
}
