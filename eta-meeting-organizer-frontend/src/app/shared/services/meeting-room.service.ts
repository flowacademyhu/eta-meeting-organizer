import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MeetingRoom } from '~/app/models/meetingroom.model';
import { ApiCommunicationService } from './api-communication.service';

@Injectable()
export class MeetingRoomService {

  public _meetingRoomSub: BehaviorSubject<MeetingRoom[]> = new BehaviorSubject<MeetingRoom[]>([]);

  constructor(private readonly meetingRoomCom: ApiCommunicationService) {}

  public get meetingRoomSub() {
    return this._meetingRoomSub;
  }

  public getAllMeetingRooms() {
   this.meetingRoomCom.meetingRoom()
    .getMeetingRooms()
    .subscribe((meetingRoom: MeetingRoom[]) => {
      this._meetingRoomSub.next(meetingRoom);
    });
  }

  public deleteMeetingRoom(id: number) {
    return this.meetingRoomCom
      .meetingRoom()
      .deleteMeetingRoomById(id);
  }

  public postMeetingRoom(meetingRoom: MeetingRoom) {
    return this.meetingRoomCom.meetingRoom()
      .postMeetingRoom(meetingRoom);
  }

  public getOneMeetingRoom(id: number) {
    return this.meetingRoomCom
    .meetingRoom()
    .getOneMeetingRoomById(id);
  }
  public updateMeetingRoom(id: number, meetingRoom: MeetingRoom) {
    return this.meetingRoomCom
    .meetingRoom()
    .updateMeetingRoom(id, meetingRoom);
  }
  public findByBuildingId(id: number) {
  return this.meetingRoomCom
  .meetingRoom()
  .findByBuildingId(id);
  }
}
