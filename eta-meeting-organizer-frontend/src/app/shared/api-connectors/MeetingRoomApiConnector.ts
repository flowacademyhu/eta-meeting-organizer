import { Observable } from 'rxjs';
import { MeetingRoom } from '~/app/models/meetingroom.model';
import { AbstractApiConnector } from '~/app/shared/api-connectors/AbstractApiConnector';
import { Page } from './../../models/page';

export class MeetingRoomApiConnector extends AbstractApiConnector {
  protected readonly apiRoute: string = `${this.apiBaseUrl}`;

  public getMeetingRooms(pageNumber: number, pageSize: number) {
   return this.http.get<Page<MeetingRoom[]>>
   (`${this.apiRoute}/meetingrooms?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  public getOneMeetingRoomById(id: number): Observable<MeetingRoom> {
    return this.http.get<MeetingRoom>(`${this.apiRoute}/meetingrooms/` + id);
  }

  public postMeetingRoom(meetingRoom: MeetingRoom): Observable<MeetingRoom> {
    return this.http.post<MeetingRoom>(`${this.apiRoute}/meetingrooms`, meetingRoom);
  }

  public updateMeetingRoom(id: number, meetingRoom: MeetingRoom) {
    return this.http.put(`${this.apiRoute}/meetingrooms/` + id, meetingRoom);
  }

  public deleteMeetingRoomById(id: number) {
    return this.http.delete(`${this.apiRoute}/meetingrooms/` + id);
  }
}
