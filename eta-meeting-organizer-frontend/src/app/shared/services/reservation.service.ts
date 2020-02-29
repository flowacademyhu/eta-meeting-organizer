import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ReservationToPost } from '~/app/models/reservation-to-post.model';
import { Reservation } from '~/app/models/reservation.model';
import { ApiCommunicationService } from './api-communication.service';

@Injectable()
export class ReservationService {

  public _reservationBehaviourSubject: BehaviorSubject<Reservation[]> = new BehaviorSubject<Reservation[]>([]);

  constructor(private readonly apiCommunicationService: ApiCommunicationService) {}

  public get reservationBehaviourSubject() {
    return this._reservationBehaviourSubject;
  }

  public postReservation(reservation: ReservationToPost) {
    return this.apiCommunicationService.reservation()
      .postReservation(reservation);
  }

  public updateReservation(id: number, reservation: ReservationToPost) {
    return this.apiCommunicationService.reservation()
      .updateReservation(id, reservation);
  }

  public deleteReservation(id: number) {
    return this.apiCommunicationService.reservation()
    .deleteReservation(id);
  }

  public findByMeetingRoomId(meetingRoomId: number) {
    this.apiCommunicationService.reservation()
     .findByMeetingRoomId(meetingRoomId)
     .subscribe((reservations: Reservation[]) => {
       this._reservationBehaviourSubject.next(reservations);
     });
   }
}
