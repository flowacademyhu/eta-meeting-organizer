export interface EventElement {
  id: string;
  userId: string;
  userName: string;
  meetingRoomName: string;
  meetingRoomId: number;
  start: number;
  end: number;
  overlap: boolean;
  title: string;
  summary: string;
  meetingRoomView: boolean;
}
