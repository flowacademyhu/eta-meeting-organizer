import { Observable } from 'rxjs';
import { Reservation } from '~/app/models/reservation.model';
import { AbstractApiConnector } from '~/app/shared/api-connectors/AbstractApiConnector';

export class ReservationApiConnector extends AbstractApiConnector {
  protected readonly apiRoute: string = `${this.apiBaseUrl}`;

  public getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiRoute}/reservations`);
  }

  public getReservationsByUserId(userId: string): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiRoute}/reservations/${userId}/users`);
  }

  public getOneReservationById(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.apiRoute}/reservations/` + id);
  }

  public postReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(`${this.apiRoute}/reservations`, reservation);
  }

  public updateReservation(id: number, reservation: Reservation) {
    return this.http.put(`${this.apiRoute}/reservations/` + id, reservation);
  }

  public deleteReservation(id: number) {
    return this.http.delete(`${this.apiRoute}/reservations/` + id);
  }
}
