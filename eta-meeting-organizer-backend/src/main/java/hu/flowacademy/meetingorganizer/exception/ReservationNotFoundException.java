package hu.flowacademy.meetingorganizer.exception;

public class ReservationNotFoundException extends NotFoundException {

  public ReservationNotFoundException(Long id) {
    super("Cannot find reservation with id: " + id);
  }
}
