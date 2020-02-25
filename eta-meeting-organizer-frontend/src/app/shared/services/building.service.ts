import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Building } from '~/app/models/building.model';
import { ApiCommunicationService } from './api-communication.service';

@Injectable({providedIn: 'root'})
export class BuildingService {

  public _buildingSub: BehaviorSubject<Building> = new BehaviorSubject<Building>({} as Building);

  constructor(
    private readonly buildingCom: ApiCommunicationService) {}

  public get buildingSub() {
    return this._buildingSub;
  }

  public getAllBuilding() {
    this.buildingCom
     .building()
     .getBuildings();
   }

  public getBuildings(): Observable<Building[]> {
    return this.buildingCom
    .building()
    .getBuildings();
  }

  public getOneBuilding(id: number) {
    return this.buildingCom
    .building()
    .getOneBuilding(id);
  }

  public postBuilding(building: Building) {
    return this.buildingCom
    .building()
    .postBuilding(building);
  }

  public updateBuilding(id: number, building: Building) {
    return this.buildingCom
    .building()
    .updateBuilding(id, building);
  }

  public deleteBuilding(id: number) {
    return this.buildingCom
    .building()
    .deleteBuildingById(id);
  }

  public findAllCities() {
    this.buildingCom
    .building()
    .findAllCities();
  }

  public findByCity(city: string) {
    this.buildingCom
    .building()
    .findByCity(city);
  }

}
