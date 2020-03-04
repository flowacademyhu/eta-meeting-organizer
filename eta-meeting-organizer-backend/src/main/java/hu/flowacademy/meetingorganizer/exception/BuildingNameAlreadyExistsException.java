package hu.flowacademy.meetingorganizer.exception;

public class BuildingNameAlreadyExistsException extends AlreadyExistsException {

  public BuildingNameAlreadyExistsException() {
    super("buildingName");
  }
}
