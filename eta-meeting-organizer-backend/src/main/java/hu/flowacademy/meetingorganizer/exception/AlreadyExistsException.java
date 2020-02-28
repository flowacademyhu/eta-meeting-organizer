package hu.flowacademy.meetingorganizer.exception;

public class AlreadyExistsException extends RuntimeException {

  public AlreadyExistsException(String message) {
    super(message);
  }
}
