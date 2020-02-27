import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Reservation } from '~/app/models/reservation.model';
import { ReservationToPost } from '~/app/models/ReservationToPost';
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

  public findByMeetingRoomId(meetingRoomId: number) {
    this.apiCommunicationService.reservation()
     .findByMeetingRoomId(meetingRoomId)
     .subscribe((reservations: Reservation[]) => {
       this._reservationBehaviourSubject.next(reservations);
     });
   }
}
