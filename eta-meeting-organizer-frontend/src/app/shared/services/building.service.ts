import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Building } from '~/app/models/building.model';
import { ApiCommunicationService } from './api-communication.service';

@Injectable()
export class BuildingService {

  public _buildingSub: BehaviorSubject<Building[]> = new BehaviorSubject<Building[]>([]);

  constructor(private readonly buildingCom: ApiCommunicationService) {}

  public get buildingSub() {
    return this._buildingSub;
  }

  public getAllBuildings() {
   this.buildingCom.building()
    .getBuildings()
    .subscribe((building: Building[]) => {
      this._buildingSub.next(building);
    });
  }

  public deleteBuilding(id: number) {
    return this.buildingCom
      .building()
      .deleteBuildingById(id);
  }

  public postBuilding(building: Building) {
    return this.buildingCom.building()
      .postBuilding(building);
  }
}
