package hu.flowacademy.meetingorganizer.service;

import hu.flowacademy.meetingorganizer.persistance.model.Reservation;
import hu.flowacademy.meetingorganizer.persistance.repository.ReservationRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import java.util.List;

@Service
@AllArgsConstructor
@Transactional
public class ReservationService {

    private ReservationRepository reservationRepository;

    public List<Reservation> findAllReservations () {
        return reservationRepository.findAll();
    }

    public Reservation findOneReservationById (Long id) {
        return reservationRepository.findById(id).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public Reservation createReservation (Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    public void deleteReservation (Long id) {
        reservationRepository.deleteById(id);
    }

    public Reservation updateReservation (Long id, Reservation reservation) {
        if (reservationRepository.findById(id).isPresent()) {
            Reservation res = reservationRepository.findById(id).get();
            res.setId(id);
            return reservationRepository.save(res);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }
}
