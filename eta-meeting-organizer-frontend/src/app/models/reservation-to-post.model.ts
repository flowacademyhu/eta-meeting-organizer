// ennek egyeznie kell a backend-es objektummal
export interface ReservationToPost {
  id: number;
  userId: string;
  meetingRoomId: number;
  startingTime: number;
  endingTime: number;
  title: string;
  summary: string;
}
