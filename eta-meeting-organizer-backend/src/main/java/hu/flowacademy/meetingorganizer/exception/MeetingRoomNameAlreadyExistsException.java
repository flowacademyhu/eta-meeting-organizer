package hu.flowacademy.meetingorganizer.exception;

public class MeetingRoomNameAlreadyExistsException extends AlreadyExistsException {

  public MeetingRoomNameAlreadyExistsException(String name) {
    super(name + " meeting room name already exists in this building.");
  }
}
