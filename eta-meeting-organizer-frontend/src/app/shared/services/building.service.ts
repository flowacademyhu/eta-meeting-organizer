import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Building } from '~/app/models/building.model';
import { environment } from '~/environment/environment';
import { ApiCommunicationService } from './api-communication.service';

@Injectable({providedIn: 'root'})
export class BuildingService {

  public _buildingSub: BehaviorSubject<Building[]> = new BehaviorSubject<Building[]>([]);

  constructor(
    private readonly buildingCom: ApiCommunicationService,
    private http: HttpClient) {}

  public get buildingSub() {
    return this._buildingSub;
  }

  public getData(route: string) {
    return this.http.get(this.createCompleteRoute(route, environment.baseUrl));
  }

  public getAllBuildings() {
   this.buildingCom.building()
    .getBuildings()
    .subscribe((building: Building[]) => {
      this._buildingSub.next(building);
    });
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

  private createCompleteRoute(route: string, envAddress: string) {
    return `${envAddress}/${route}`;
  }

}
