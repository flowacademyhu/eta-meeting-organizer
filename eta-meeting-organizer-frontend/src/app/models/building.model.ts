import { MeetingRoom } from './meetingroom.model';

export interface Building {
  id: number;
  city: string;
  address: string;
  meetingRoom?: MeetingRoom[];
}
