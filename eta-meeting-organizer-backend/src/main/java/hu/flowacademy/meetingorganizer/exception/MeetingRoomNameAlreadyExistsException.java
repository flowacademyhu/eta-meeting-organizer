package hu.flowacademy.meetingorganizer.exception;

public class MeetingRoomNameAlreadyExistsException extends AlreadyExistsException {

  public MeetingRoomNameAlreadyExistsException(String name) {
    super("A meeting room with the following name already exists in this building: " + name);
  }
}
