package hu.flowacademy.meetingorganizer.service;

import hu.flowacademy.meetingorganizer.email.EmailType;
import hu.flowacademy.meetingorganizer.email.GmailService;
import hu.flowacademy.meetingorganizer.exception.MeetingRoomNotFoundException;
import hu.flowacademy.meetingorganizer.exception.ReservationNotFoundException;
import hu.flowacademy.meetingorganizer.exception.UserNotFoundException;
import hu.flowacademy.meetingorganizer.exception.ValidationException;
import hu.flowacademy.meetingorganizer.persistence.model.MeetingRoom;
import hu.flowacademy.meetingorganizer.persistence.model.Participant;
import hu.flowacademy.meetingorganizer.persistence.model.Reservation;
import hu.flowacademy.meetingorganizer.persistence.model.User;
import hu.flowacademy.meetingorganizer.persistence.model.dto.ReservationDTO;
import hu.flowacademy.meetingorganizer.persistence.repository.MeetingRoomRepository;
import hu.flowacademy.meetingorganizer.persistence.repository.ParticipantRepository;
import hu.flowacademy.meetingorganizer.persistence.repository.ReservationRepository;
import hu.flowacademy.meetingorganizer.persistence.repository.UserRepository;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;
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
  private ParticipantRepository participantRepository;
  private MeetingRoomRepository meetingRoomRepository;
  private static final DateFormat FORMATTER_TO_HOUR = new SimpleDateFormat("HH:mm");
  private static final DateFormat FORMATTER_TO_DATE = new SimpleDateFormat("yyyy-MM-dd");
  private final GmailService emailService;

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
    validateReservation(reservationInput, "create", 0l);
    User user = userRepository.findById(reservationInput.getUserId())
        .orElseThrow(() -> new UserNotFoundException(reservationInput.getUserId()));
    MeetingRoom mRoom = meetingRoomRepository.findById(reservationInput.getMeetingRoomId())
        .orElseThrow(MeetingRoomNotFoundException::new);
    List<Participant> participants = reservationInput.getParticipants();
    participants.stream().forEach(
        x -> participantRepository.findById(x.getEmail()).orElseGet(() -> saveParticipant(x)));
    Reservation reservation = reservationInput.toSaveEntity(user, mRoom);
    Reservation result = reservationRepository.save(reservation);
    sendWithEmails(reservation, EmailType.CREATE);
    return result;
  }

  public void deleteReservation(Long id) {
    Reservation reservation = reservationRepository.findById(id)
        .orElseThrow(ReservationNotFoundException::new);
    reservationRepository.deleteById(id);
    sendWithEmails(reservation, EmailType.DELETE);
  }

  public Reservation updateReservation(Long id, ReservationDTO reservationInput) {
    if (reservationRepository.findById(id).isPresent()) {
      validateReservation(reservationInput, "update", id);
      User user = userRepository.findById(reservationInput.getUserId())
          .orElseThrow(() -> new UserNotFoundException(reservationInput.getUserId()));
      MeetingRoom mRoom = meetingRoomRepository.findById(reservationInput.getMeetingRoomId())
          .orElseThrow(MeetingRoomNotFoundException::new);
      Reservation reservation = reservationInput.toUpdateEntity(id, user, mRoom);
      reservation.setParticipants(
          reservationRepository.findById(id).orElseThrow(ReservationNotFoundException::new)
              .getParticipants());
      Reservation result = reservationRepository.save(reservation);
      sendWithEmails(result, EmailType.UPDATE);
      return result;
    }
    throw new ReservationNotFoundException();
  }

<<<<<<< HEAD
  private void validateReservation(ReservationDTO input, String type, Long id) {
    if (type.equals("create")) {
      if (reservationRepository
          .findAllByMeetingRoomIdInInterval(input.getMeetingRoomId(), input.getStartingTime(),
              input.getEndingTime()) > 0) {
        throw new ValidationException("reservation.reserved");
      }
      if (type.equals("update")) {
        if (reservationRepository
            .findAllByMeetingRoomIdInIntervalForUpdate(input.getMeetingRoomId(), id,
                input.getStartingTime(), input.getEndingTime()) > 0) {
          throw new ValidationException("reservation.reserved");
        }

      }
=======
  public void sendWithEmails(Reservation reservation, EmailType type) {
    MeetingRoom meetingRoom = meetingRoomRepository.findById(reservation.getMeetingRoom().getId())
        .orElseThrow(MeetingRoomNotFoundException::new);
    User user = userRepository.findById(reservation.getUser().getId()).orElseThrow();
    Date startingDate = new Date(reservation.getStartingTime());
    String meetingDate = FORMATTER_TO_DATE.format(startingDate);
    String start = FORMATTER_TO_HOUR.format(startingDate);
    String finish = FORMATTER_TO_HOUR.format(reservation.getEndingTime());
    String subject = reservation.getTitle();
    String city = meetingRoom.getBuilding().getCity();
    String address = meetingRoom.getBuilding().getAddress();
    String buildingName = meetingRoom.getBuilding().getBuildingName();
    String meetingRoomName = meetingRoom.getName();
    sendEmailForAttendants(reservation, meetingDate, start, finish, subject, city, address,
        buildingName, meetingRoomName, user, type);
  }

  private void sendEmailForAttendants(Reservation reservation, String meetingDate, String start,
      String finish, String subject, String city, String address, String buildingName,
      String meetingroomName,
      User user, EmailType emailType) {
    List<Participant> participants = reservation.getParticipants();
    participants.add(Participant.builder().email(user.getUsername()).build());
    for (Participant participant : participants) {
      emailService.send(participant.getEmail(), subject, emailType.getTemplateName(),
          Map.of("meetingDate", meetingDate,
              "start", start,
              "finish", finish,
              "title", subject,
              "city", city,
              "address", address,
              "buildingName", buildingName,
              "meetingRoomName", meetingroomName))
      ;
    }
  }

  private void validateReservation(ReservationDTO input) {
    if(reservationRepository.findAllByMeetingRoomIdInInterval(input.getMeetingRoomId(), input.getStartingTime(), input.getEndingTime()) > 0) {
      throw new ValidationException("reservation.reserved");
>>>>>>> master
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

  private Participant saveParticipant(Participant participant) {
    return participantRepository.save(participant);
  }
}
