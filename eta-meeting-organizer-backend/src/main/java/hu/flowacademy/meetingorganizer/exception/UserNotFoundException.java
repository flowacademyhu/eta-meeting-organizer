package hu.flowacademy.meetingorganizer.exception;

public class UserNotFoundException extends NotFoundException {

  public UserNotFoundException(String id) {
    super("user");
  }
}
