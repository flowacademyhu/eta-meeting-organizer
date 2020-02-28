package hu.flowacademy.meetingorganizer.exception;

public class BuildingNotFoundException extends NotFoundException {

  public BuildingNotFoundException(Long id) {
    super("Cannot find building with id: " + id);
  }
}
