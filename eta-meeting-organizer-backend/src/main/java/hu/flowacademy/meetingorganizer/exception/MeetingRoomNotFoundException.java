package hu.flowacademy.meetingorganizer.exception;

public class MeetingRoomNotFoundException extends NotFoundException {

  public MeetingRoomNotFoundException() {
    super("meetingRoomId");
  }
}
