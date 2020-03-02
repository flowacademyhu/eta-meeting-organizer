// ennek egyeznie kell a backend-es objektummal
export class ReservationToPost {
  public id?: number;
  public userId?: string;
  public meetingRoomId?: number;
  public startingTime?: number;
  public endingTime?: number;
  public title?: string;
  public summary?: string;

  public constructor();
  public constructor(
    id: number,
    userId: string,
    meetinRoomId: number,
    startingTime: number,
    endingTime: number,
    title: string,
    summary: string)
    public constructor(
      id?: number,
      userId?: string,
      meetinRoomId?: number,
      startingTime?: number,
      endingTime?: number,
      title?: string,
      summary?: string) {
      this.id = id;
      this.userId = userId;
      this.meetingRoomId = meetinRoomId;
      this.startingTime = startingTime;
      this.endingTime = endingTime;
      this.title = title;
      this.summary = summary;
  }
}
