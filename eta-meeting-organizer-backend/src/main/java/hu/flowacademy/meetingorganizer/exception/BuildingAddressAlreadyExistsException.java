package hu.flowacademy.meetingorganizer.exception;

public class BuildingAddressAlreadyExistsException extends AlreadyExistsException{

  public BuildingAddressAlreadyExistsException(String address) {
    super("A building with the following address already exists: " + address);
  }
}
