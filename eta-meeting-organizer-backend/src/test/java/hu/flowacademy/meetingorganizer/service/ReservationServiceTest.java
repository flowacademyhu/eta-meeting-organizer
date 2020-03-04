package hu.flowacademy.meetingorganizer.service;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import hu.flowacademy.meetingorganizer.persistence.model.Reservation;
import hu.flowacademy.meetingorganizer.persistence.model.dto.ReservationDTO;
import hu.flowacademy.meetingorganizer.persistence.repository.ReservationRepository;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
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

  @Mock
  private ReservationRepository reservationRepository;

  @InjectMocks
  private ReservationService reservationService;

  @BeforeEach
  public void setUp() {
    MockitoAnnotations.initMocks(this);
  }

  @BeforeAll
  public static void init() {
    reservation1 = Reservation.builder().id(1L).title("Napi meeting")
        .summary("Megbeszéljük ki mivel haladt tegnap és mivel fog ma foglalkozni.").startingTime(
            (LocalDateTime.of(2020, 2, 25, 16, 0)).toInstant(ZoneOffset.UTC).toEpochMilli())
        .endingTime(
            (LocalDateTime.of(2020, 2, 25, 18, 0)).toInstant(ZoneOffset.UTC).toEpochMilli())
        .build();
    reservation2 = Reservation.builder().id(2L).title("Flow tárgyalás")
        .summary("Új ügyfelek felkutatása.").startingTime(
            (LocalDateTime.of(2020, 2, 26, 9, 0)).toInstant(ZoneOffset.UTC).toEpochMilli())
        .endingTime((LocalDateTime.of(2020, 2, 26, 9, 15)).toInstant(ZoneOffset.UTC).toEpochMilli())
        .build();
    reservationDTO = ReservationDTO.builder().title("Húsvét")
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
  public void createReservationTest() {
    reservationService.createReservation(reservationDTO);
    assertEquals((LocalDateTime.of(2020, 2, 25, 16, 0)).toInstant(ZoneOffset.UTC).toEpochMilli(), reservationDTO.getStartingTime());
    assertEquals((LocalDateTime.of(2020, 2, 27, 14, 15)).toInstant(ZoneOffset.UTC).toEpochMilli(), reservationDTO.getEndingTime());
  }

  @Test
  public void updateReservationTest() {
    reservationService.updateReservation(1L, reservationDTO);
    assertEquals(1L, reservation.getId());
    assertEquals(reservation.getId(), reservation1.getId());
    assertEquals(reservation.getStartingTime(), reservation1.getStartingTime());
    assertNotEquals(reservation.getEndingTime(), reservation1.getEndingTime());
  }

  @Test
  public void deleteReservationTest() {
    reservationService.deleteReservation(1L);
    verify(reservationRepository, times(1)).deleteById(1L);
  }
}