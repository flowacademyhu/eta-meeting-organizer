package hu.flowacademy.meetingorganizer.service;

import hu.flowacademy.meetingorganizer.persistence.model.Reservation;
import hu.flowacademy.meetingorganizer.persistence.repository.ReservationRepository;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@AllArgsConstructor
@Transactional
public class ReservationService {

  private ReservationRepository reservationRepository;

  public List<Reservation> findAll() {
    return reservationRepository.findAll();
  }

  public List<Reservation> findReservationsByUserId(Long id) {
    return reservationRepository.findByUser_Id(id);
  }

  public List<Reservation> findReservationsByMeetingRoomId(Long id) {
    return reservationRepository.findByMeetingRoom_Id(id);
  }

  public Optional<Reservation> findOne(Long id) {
    return reservationRepository.findById(id);
  }

  public Reservation createReservation(Reservation reservation) {
    return reservationRepository.save(reservation);
  }

  public void deleteReservation(Long id) {
    reservationRepository.deleteById(id);
  }

  public Reservation updateReservation(Long id, Reservation reservation) {
    reservation.setId(id);
    return reservationRepository.save(reservation);
  }
}
