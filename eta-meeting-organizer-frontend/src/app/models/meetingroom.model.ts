import { Building } from './building.model';

export interface MeetingRoom {
  id?: number;
  name?: string;
  numberOfSeat?: number;
  projector?: boolean;
  building?: Building;
}
