import { Observable } from 'rxjs';
import { Building } from '~/app/models/building.model';
import { AbstractApiConnector } from '~/app/shared/api-connectors/AbstractApiConnector';

export class BuildingApiConnector extends AbstractApiConnector {
  protected readonly apiRoute: string = `${this.apiBaseUrl}`;

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

  public deleteBuildingId(id: number) {
    return this.http.delete(`${this.apiRoute}/buildings/` + id);
  }
}
