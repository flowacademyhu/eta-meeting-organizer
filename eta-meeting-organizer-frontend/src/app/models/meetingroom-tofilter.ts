import { MeetingRoom } from './meetingroom.model';

export class MeetingRoomToFilter {
  public id: number;
  public name: string;
  public numberOfSeats: number;
  public projector: boolean;
  public buildingCity: string;
  public buildingAddress: string;

  public meetingRoomToMeetingRoomFilter(meetingRoom: MeetingRoom): MeetingRoomToFilter {
    const meetingRoomToFilter = new MeetingRoomToFilter();
    meetingRoomToFilter.id = meetingRoom.id;
    meetingRoomToFilter.name = meetingRoom.name;
    meetingRoomToFilter.numberOfSeats = meetingRoom.numberOfSeats;
    meetingRoomToFilter.projector = meetingRoom.projector;
    meetingRoomToFilter.buildingCity = meetingRoom.building?.city as string;
    meetingRoomToFilter.buildingAddress = meetingRoom.building?.address as string;
    return meetingRoomToFilter;
  }
}
