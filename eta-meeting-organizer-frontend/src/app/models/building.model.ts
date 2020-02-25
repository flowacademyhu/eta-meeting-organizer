import { MeetingRoom } from './meetingroom.model';

export interface Building {
  id: number;
  city: string;
  address: string;
  buildingName: string;
  meetingRoom?: MeetingRoom[];
}
