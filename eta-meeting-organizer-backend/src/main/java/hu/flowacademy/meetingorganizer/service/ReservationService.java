package hu.flowacademy.meetingorganizer.service;

import hu.flowacademy.meetingorganizer.exception.MeetingRoomNotFoundException;
import hu.flowacademy.meetingorganizer.exception.ReservationNotFoundException;
import hu.flowacademy.meetingorganizer.exception.UserNotFoundException;
import hu.flowacademy.meetingorganizer.exception.ValidationException;
import hu.flowacademy.meetingorganizer.persistence.model.MeetingRoom;
import hu.flowacademy.meetingorganizer.persistence.model.Reservation;
import hu.flowacademy.meetingorganizer.persistence.model.User;
import hu.flowacademy.meetingorganizer.persistence.model.dto.ReservationDTO;
import hu.flowacademy.meetingorganizer.persistence.repository.MeetingRoomRepository;
import hu.flowacademy.meetingorganizer.persistence.repository.ReservationRepository;
import hu.flowacademy.meetingorganizer.persistence.repository.UserRepository;
import java.util.Objects;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import org.springframework.util.StringUtils;

@Service
@AllArgsConstructor
@Transactional
public class ReservationService {

  private ReservationRepository reservationRepository;
  private UserRepository userRepository;
  private MeetingRoomRepository meetingRoomRepository;

  public List<Reservation> findAll() {
    return reservationRepository.findAll();
  }

  public List<Reservation> findReservationsByUserId(String id) {
    return reservationRepository.findByUser_Id(id);
  }

  public List<Reservation> findReservationsByMeetingRoomId(Long id) {
    return reservationRepository.findByMeetingRoom_Id(id);
  }

  public Optional<Reservation> findOne(Long id) {
    return reservationRepository.findById(id);
  }

  public Reservation createReservation(ReservationDTO reservationInput) {
    validateReservation(reservationInput);
    User user = userRepository.findById(reservationInput.getUserId())
        .orElseThrow(() -> new UserNotFoundException(reservationInput.getUserId()));
    MeetingRoom mRoom = meetingRoomRepository.findById(reservationInput.getMeetingRoomId())
        .orElseThrow(MeetingRoomNotFoundException::new);
    Reservation reservation = reservationInput.toSaveEntity(user, mRoom);
    return reservationRepository.save(reservation);
  }

  public void deleteReservation(Long id) {
    reservationRepository.deleteById(id);
  }

  public Reservation updateReservation(Long id, ReservationDTO reservationInput) {
    if (reservationRepository.findById(id).isPresent()) {
      validateReservation(reservationInput);
      User user = userRepository.findById(reservationInput.getUserId())
          .orElseThrow(() -> new UserNotFoundException(reservationInput.getUserId()));
      MeetingRoom mRoom = meetingRoomRepository.findById(reservationInput.getMeetingRoomId())
          .orElseThrow(MeetingRoomNotFoundException::new);
      Reservation reservation = reservationInput.toUpdateEntity(id, user, mRoom);
      return reservationRepository.save(reservation);
    }
    throw new ReservationNotFoundException();
  }

  private void validateReservation(ReservationDTO input) {
    if(reservationRepository.findAllByMeetingRoomIdInInterval(input.getMeetingRoomId(), input.getStartingTime(), input.getEndingTime()) > 0) {
      throw new ValidationException("reservation.reserved");
    }
    if (StringUtils.isEmpty(input.getUserId())) {
      throw new ValidationException("reservation.userId");
    }
    if (Objects.isNull(input.getMeetingRoomId())) {
      throw new ValidationException("reservation.meetingRoomId");
    }
    if (Objects.isNull(input.getStartingTime())) {
      throw new ValidationException("reservation.startingTime");
    }
    if (Objects.isNull(input.getEndingTime())) {
      throw new ValidationException("reservation.endingTime");
    }
    if (StringUtils.isEmpty(input.getTitle())) {
      throw new ValidationException("reservation.title");
    }
  }
}
