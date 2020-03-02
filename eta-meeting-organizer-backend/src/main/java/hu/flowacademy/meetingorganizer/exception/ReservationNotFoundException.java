package hu.flowacademy.meetingorganizer.exception;

public class ReservationNotFoundException extends NotFoundException {

  public ReservationNotFoundException() {
    super("reservation");
  }
}
