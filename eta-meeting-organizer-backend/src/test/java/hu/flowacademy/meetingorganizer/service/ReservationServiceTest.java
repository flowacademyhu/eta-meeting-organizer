package hu.flowacademy.meetingorganizer.service;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import hu.flowacademy.meetingorganizer.persistence.model.MeetingRoom;
import hu.flowacademy.meetingorganizer.persistence.model.Participant;
import hu.flowacademy.meetingorganizer.persistence.model.Reservation;
import hu.flowacademy.meetingorganizer.persistence.model.Role;
import hu.flowacademy.meetingorganizer.persistence.model.User;
import hu.flowacademy.meetingorganizer.persistence.model.dto.BuildingDTO;
import hu.flowacademy.meetingorganizer.persistence.model.dto.ReservationDTO;
import hu.flowacademy.meetingorganizer.persistence.repository.ParticipantRepository;
import hu.flowacademy.meetingorganizer.persistence.repository.ReservationRepository;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
public class ReservationServiceTest {

  private static Reservation reservation1;
  private static Reservation reservation2;
  private static Reservation reservation;
  private static ReservationDTO reservationDTO;
  private static User user1;
  private static User user2;
  private static BuildingDTO building1;
  private static MeetingRoom meetingRoom1;
  private static Participant participant;
  private static List<Participant> participants = new ArrayList<>();

  @Mock
  private ReservationRepository reservationRepository;
  @Mock
  private ParticipantRepository participantRepository;

  @InjectMocks
  private ReservationService reservationService;

  @BeforeEach
  public void setUp() {
    MockitoAnnotations.initMocks(this);
  }

  @BeforeAll
  public static void init() {
    participant = Participant.builder().email("zsani@gmail.com").build();
    user1 = User.builder().id("12345rtz").username("gyula@gmail.com").password("alma")
        .role(Role.ADMIN).accountNonExpired(true).accountNonLocked(true).enabled(true).build();
    user2 = User.builder().id("10769rzt").username("isti@gmail.com").role(Role.USER)
        .accountNonExpired(true).accountNonLocked(true).enabled(true).build();

    building1 = BuildingDTO.builder().buildingName("Fehérház").id(1L).city("Paks")
        .address("Jakab utca 3.").build();

    meetingRoom1 = MeetingRoom.builder().id(1L).name("Kistárgyaló").numberOfSeats(12)
        .projector(true).building(building1.toEntity()).build();

    reservation1 = Reservation.builder().id(1L).title("Napi meeting")
        .summary("Megbeszéljük ki mivel haladt tegnap és mivel fog ma foglalkozni.").startingTime(
            (LocalDateTime.of(2020, 2, 25, 16, 0)).toInstant(ZoneOffset.UTC).toEpochMilli())
        .endingTime(
            (LocalDateTime.of(2020, 2, 25, 18, 0)).toInstant(ZoneOffset.UTC).toEpochMilli())
        .meetingRoom(meetingRoom1).user(user1).participants(participants)
        .build();
    reservation2 = Reservation.builder().id(2L).title("Flow tárgyalás")
        .summary("Új ügyfelek felkutatása.").startingTime(
            (LocalDateTime.of(2020, 2, 26, 9, 0)).toInstant(ZoneOffset.UTC).toEpochMilli())
        .endingTime((LocalDateTime.of(2020, 2, 26, 9, 15)).toInstant(ZoneOffset.UTC).toEpochMilli())
        .build();

    reservationDTO = ReservationDTO.builder().userId("12345rtz").meetingRoomId(1L).title("Húsvét")
        .summary("húsvéti program megbeszélése Pennywise-al").startingTime(
            (LocalDateTime.of(2020, 2, 27, 12, 0)).toInstant(ZoneOffset.UTC).toEpochMilli())
        .endingTime(
            (LocalDateTime.of(2020, 2, 27, 14, 15)).toInstant(ZoneOffset.UTC).toEpochMilli())
        .build();
  }

  @Test
  public void findOneTest() {
    when(reservationRepository.findById(1L)).thenReturn(Optional.of(reservation1));
    assertThat(reservationService.findOne(1L), is(Optional.of(reservation1)));
    verify(reservationRepository, times(1)).findById(1L);
  }

  @Test
  public void findAllTest() {
    List<Reservation> expectedReservations = Arrays.asList(reservation1, reservation2);
    doReturn(expectedReservations).when(reservationRepository).findAll();

    List<Reservation> actualUsers = reservationService.findAll();
    assertEquals(actualUsers, expectedReservations);

  }

  @Test
  public void findReservationsByUserIdTest() {
    when(reservationRepository.findByUser_Id("12345rtz")).thenReturn(List.of(reservation1));
    assertThat(reservationService.findReservationsByUserId("12345rtz"), is(List.of(reservation1)));
    verify(reservationRepository, times(1)).findByUser_Id("12345rtz");
  }

  @Test
  public void findReservationsByMeetingRoomIdTest() {
    when(reservationRepository.findByMeetingRoom_Id(1L)).thenReturn(List.of(reservation1));
    assertThat(reservationService.findReservationsByMeetingRoomId(1L), is(List.of(reservation1)));
    verify(reservationRepository, times(1)).findByMeetingRoom_Id(1L);
  }

  @Test
  public void saveParticipantTest() {
    when(participantRepository.save(participant)).thenReturn(participant);
    assertThat(reservationService.saveParticipant(participant), is(participant));
    verify(participantRepository, times(1)).save(participant);
  }
}