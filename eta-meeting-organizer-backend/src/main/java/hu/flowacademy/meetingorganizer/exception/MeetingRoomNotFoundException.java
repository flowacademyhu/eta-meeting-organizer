package hu.flowacademy.meetingorganizer.exception;

public class MeetingRoomNotFoundException extends NotFoundException {

  public MeetingRoomNotFoundException(Long id) {
    super("Cannot find meeting room with id " + id);
  }
}
