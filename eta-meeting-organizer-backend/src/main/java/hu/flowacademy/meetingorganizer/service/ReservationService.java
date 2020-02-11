package hu.flowacademy.meetingorganizer.service;

import hu.flowacademy.meetingorganizer.persistance.model.Reservation;
import hu.flowacademy.meetingorganizer.persistance.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ReservationService {

    @Autowired
    ReservationRepository reservationRepository;

    public List<Reservation> findAllReservations () {
        return reservationRepository.findAll();
    }

    public Reservation findOneReservationById (Long id) {
        return reservationRepository.findById(id).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public ResponseEntity<?> createReservation (Reservation reservation) {
        reservationRepository.save(reservation);
        return new ResponseEntity<>(reservation, HttpStatus.CREATED);
    }

    public ResponseEntity<Void> deleteReservation (Long id) {
        reservationRepository.deleteById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    public ResponseEntity<Reservation> updateReservation (Long id, Reservation reservation) {
        if (reservationRepository.findById(id).isPresent()) {
            Reservation res = reservationRepository.findById(id).get();
            reservationRepository.save(res);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.status(HttpStatus.ACCEPTED).build();
    }
}
