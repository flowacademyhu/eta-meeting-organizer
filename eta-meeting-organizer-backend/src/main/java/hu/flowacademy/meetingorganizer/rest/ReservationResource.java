package hu.flowacademy.meetingorganizer.rest;

import hu.flowacademy.meetingorganizer.persistence.model.Reservation;
import hu.flowacademy.meetingorganizer.service.ReservationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class ReservationResource {

  private ReservationService reservationService;

  @GetMapping("/reservations")
  public List<Reservation> findAllReservations() {
    return reservationService.findAllReservations();
  }

  @GetMapping("/reservations/{id}")
  public Reservation findOneReservationById(@PathVariable Long id) {
    return reservationService.findOneReservationById(id);
  }

  @PostMapping("/reservations")
  public ResponseEntity<?> createReservation(@RequestBody Reservation reservation) {
    reservationService.createReservation(reservation);
    return new ResponseEntity<>(reservation, HttpStatus.CREATED);
  }

  @DeleteMapping("/reservations/{id}")
  public ResponseEntity<Void> deleteReservation(@PathVariable Long id) {
    reservationService.deleteReservation(id);
    return ResponseEntity.noContent().build();
  }

  @PutMapping("/reservations/{id}")
  public ResponseEntity<Reservation> updateReservation(@PathVariable Long id,
      @RequestBody Reservation reservation) {
    reservationService.updateReservation(id, reservation);
    return ResponseEntity.accepted().build();
  }
}
