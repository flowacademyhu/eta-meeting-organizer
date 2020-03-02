package hu.flowacademy.meetingorganizer.exception;

public class ValidationException extends RuntimeException {

  public ValidationException(String message) {
    super("validate." + message);
  }
}
