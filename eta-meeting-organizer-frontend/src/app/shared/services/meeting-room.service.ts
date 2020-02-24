import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MeetingRoom } from '~/app/models/meetingroom.model';
import { ApiCommunicationService } from './api-communication.service';
import { Page } from './../../models/page';


@Injectable()
export class MeetingRoomService {
  public _meetingRoomSub: BehaviorSubject<Page<MeetingRoom[]>> = new BehaviorSubject<Page<MeetingRoom[]>>(
    {
      content: [],
      totalElements: 0}
    );

  constructor(private readonly meetingRoomCom: ApiCommunicationService) {}

  public get meetingRoomSub() {
    return this._meetingRoomSub;
  }

  public getAllMeetingRooms(pageIndex: number, pageSize: number) {
    if (!event) {
      return;
    }
    this.meetingRoomCom.meetingRoom()
    .getMeetingRooms(pageIndex, pageSize)
    .subscribe((page: Page<MeetingRoom[]>) => {
      this._meetingRoomSub.next(page);
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

}
