import { MeetingRoom } from './meetingroom.model';
import { User } from './user.model';

export interface Reservation {
  id: number;
  user?: User;
  meetingRoom?: MeetingRoom;
  startingTime: Date;
  endingTime: Date;
  title: string;
  summary: string;
}
