import { MeetingRoom } from './meetingroom.model';
import { Participant } from './participant.model';
import { User } from './user.model';

export interface Reservation {
  id: number;
  user?: User;
  meetingRoom?: MeetingRoom;
  startingTime: number;
  endingTime: number;
  title: string;
  summary: string;
  participants?: Participant[];
}
