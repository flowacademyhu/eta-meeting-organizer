import { Observable } from 'rxjs';
import { ReservationToPost } from '~/app/models/reservation-to-post.model';
import { Reservation } from '~/app/models/reservation.model';
import { AbstractApiConnector } from '~/app/shared/api-connectors/AbstractApiConnector';

export class ReservationApiConnector extends AbstractApiConnector {
  protected readonly apiRoute: string = `${this.apiBaseUrl}`;

  public getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiRoute}/reservations`);
  }

  public findByMeetingRoomId(meetingRoomId: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiRoute}/reservations/${meetingRoomId}/meetingrooms`);
  }

  public getReservationsByUserId(userId: string): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiRoute}/reservations/${userId}/users`);
  }

  public getOneReservationById(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.apiRoute}/reservations/` + id);
  }

  public postReservation(reservation: ReservationToPost): Observable<ReservationToPost> {
    return this.http.post<ReservationToPost>(`${this.apiRoute}/reservations`, reservation);
  }

  public updateReservation(id: number, reservation: ReservationToPost) {
    return this.http.put(`${this.apiRoute}/reservations/` + id, reservation);
  }

  public deleteReservation(id: number) {
    return this.http.delete(`${this.apiRoute}/reservations/` + id);
  }
}
