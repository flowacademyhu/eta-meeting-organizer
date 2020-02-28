package hu.flowacademy.meetingorganizer.exception;

public class BuildingNameAlreadyExistsException extends AlreadyExistsException {

  public BuildingNameAlreadyExistsException(String buildingName) {
    super("A building with the following building name already exists in this city: " + buildingName);
  }
}
