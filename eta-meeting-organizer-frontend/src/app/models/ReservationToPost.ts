export interface ReservationToPost {
  id: number;
  userId: number;
  meetingRoomId: number;
  startingTime: number;
  endingTime: number;
  title: string;
  summary: string;
}
