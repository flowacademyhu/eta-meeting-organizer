package hu.flowacademy.meetingorganizer.exception;

public class MeetingRoomNameAlreadyExistsException extends AlreadyExistsException {

  public MeetingRoomNameAlreadyExistsException() {
    super("meetingRoomName");
  }
}
