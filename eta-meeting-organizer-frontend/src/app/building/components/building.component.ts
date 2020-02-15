import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';
import { Building } from '~/app/models/building.model';

@Component({
  selector: 'app-building',
  styles: [`
    .row {
      min-height: calc(100vh - 60px);
    }
    table {
      width: 100%;
    }
  `],
  template: `
    <div class="row justify-content-center">
      <table mat-table [dataSource]="building$" class="mat-elevation-z8">
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
          <td mat-cell *matCellDef="let building"><button mat-raised-button color="warn">{{'building.deleteButton' | translate}}</button> </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </div>
  `
})

export class BuildingComponent {

  public building$: Observable<Building[]>;

  constructor(private readonly api: ApiCommunicationService) {
    this.building$ = this.api.building()
    .getBuildings();
   }
   public displayedColumns: string[] = ['city', 'address','delete'];
   public dataSource = this.building$;
}
