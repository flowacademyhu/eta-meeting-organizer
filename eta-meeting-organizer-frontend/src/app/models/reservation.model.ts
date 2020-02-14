import { Time } from '@angular/common';
import { MeetingRoom } from './meetingroom.model';
import { User } from './placeholder-user.model';

export interface Reservation {
  id?: number;
  user?: User;
  meetingRoom?: MeetingRoom;
  startingTime?: Time;
  endingTime?: Time;
  title?: string;
  summary?: string;
}
