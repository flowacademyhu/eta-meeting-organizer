import { Observable } from 'rxjs';
import { Building } from '~/app/models/building.model';
import { AbstractApiConnector } from '~/app/shared/api-connectors/AbstractApiConnector';

export class BuildingApiConnector extends AbstractApiConnector {
  protected readonly apiRoute: string = `${this.apiBaseUrl}`;

  public getCities(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiRoute}/buildings/cities/names`);
  }

  public getBuildings(): Observable<Building[]> {
    return this.http.get<Building[]>(`${this.apiRoute}/buildings`);
  }

  public getOneBuilding(id: number): Observable<Building> {
    return this.http.get<Building>(`${this.apiRoute}/buildings/` + id);
  }

  public postBuilding(building: Building): Observable<Building> {
    return this.http.post<Building>(`${this.apiRoute}/buildings`, building);
  }

  public updateBuilding(id: number, building: Building) {
    return this.http.put(`${this.apiRoute}/buildings/` + id, building);
  }

  public deleteBuildingById(id: number) {
    return this.http.delete(`${this.apiRoute}/buildings/` + id);
  }

  public findAllCities() {
    return this.http.get<string[]>(`${this.apiRoute}/buildings/cities/names`);
  }

  public findByCity(city: string): Observable<Building[]> {
    return this.http.get<Building[]>(`${this.apiRoute}/buildings/cities?city=${city}`);
  }

  public deleteBuildingByCheckbox(id: number[]) {
    return this.http.post(`${this.apiRoute}/buildings/groupdelete`, id);
  }
}
