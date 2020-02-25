import { Injectable } from '@angular/core';
import { Reservation } from '~/app/models/reservation.model';
import { ApiCommunicationService } from './api-communication.service';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ReservationService {

  public _reservationBehaviourSubject: BehaviorSubject<Reservation[]> = new BehaviorSubject<Reservation[]>([]);

  constructor(private readonly apiCommunicationService: ApiCommunicationService) {}

  public get reservationBehaviourSubject() {
    return this.reservationBehaviourSubject;
  }

  public postReservation(reservation: Reservation) {
    return this.apiCommunicationService.reservation()
      .postReservation(reservation);
  }

  public findByMeetingRoomId(meetingRoomId: number) {
    this.apiCommunicationService.reservation()
     .findByMeetingRoomId(meetingRoomId)
     .subscribe((reservations: Reservation[]) => {
       this.reservationBehaviourSubject.next(reservations);
     });
   }
}
