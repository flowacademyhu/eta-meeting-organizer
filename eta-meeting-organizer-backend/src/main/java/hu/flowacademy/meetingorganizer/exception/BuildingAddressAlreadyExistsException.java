package hu.flowacademy.meetingorganizer.exception;

public class BuildingAddressAlreadyExistsException extends AlreadyExistsException {

  public BuildingAddressAlreadyExistsException() {
    super("address");
  }
}
