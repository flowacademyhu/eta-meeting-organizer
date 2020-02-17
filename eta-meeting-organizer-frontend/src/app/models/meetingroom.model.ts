import { Building } from './building.model';

export interface MeetingRoom {
  id: number;
  name: string;
  numberOfSeats: number;
  projector: boolean;
  building?: Building;
}
