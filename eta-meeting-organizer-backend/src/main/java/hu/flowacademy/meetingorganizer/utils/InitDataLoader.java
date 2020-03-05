package hu.flowacademy.meetingorganizer.utils;

import hu.flowacademy.meetingorganizer.persistence.model.Building;
import hu.flowacademy.meetingorganizer.persistence.model.MeetingRoom;
import hu.flowacademy.meetingorganizer.persistence.model.Reservation;
import hu.flowacademy.meetingorganizer.persistence.model.Role;
import hu.flowacademy.meetingorganizer.persistence.model.User;
import hu.flowacademy.meetingorganizer.persistence.repository.BuildingRepository;
import hu.flowacademy.meetingorganizer.persistence.repository.MeetingRoomRepository;
import hu.flowacademy.meetingorganizer.persistence.repository.*;
import hu.flowacademy.meetingorganizer.persistence.repository.UserRepository;
import java.time.ZoneOffset;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import javax.annotation.PostConstruct;
import java.time.LocalDateTime;

@Component
@Transactional
@AllArgsConstructor
public class InitDataLoader {

  private final BuildingRepository buildingRepository;
  private final ReservationRepository reservationRepository;
  private final UserRepository userRepository;
  private final MeetingRoomRepository meetingRoomRepository;

  @PostConstruct
  public void init() {
    final var building1 = buildingRepository.save(Building.builder()
        .id(1L)
        .city("Budapest")
        .address("Kelemen János utca 11 2/6")
        .buildingName("Üzleti Központ")
        .build());
    final var building2 = buildingRepository.save(Building.builder()
        .id(2L)
        .city("Kecskemét")
        .address("Kiss István utca 131")
        .buildingName("Kecskeméti Fióktelep")
        .build());
    final var building3 = buildingRepository.save(Building.builder()
        .id(3L)
        .city("Szeged")
        .address("Tisza Lajos krt. 22.")
        .buildingName("Városi Székház")
        .build());
    final var building4 = buildingRepository.save(Building.builder()
        .id(4L)
        .city("Budapest")
        .address("Nagy Lajos sugárút 72/A")
        .buildingName("Logisztikai Központ")
        .build());
    final var building5 = buildingRepository.save(Building.builder()
        .id(5L)
        .city("Győr")
        .address("Győri utca 28 3/28")
        .buildingName("Árkád Üzletközpont")
        .build());
    final var building6 = buildingRepository.save(Building.builder()
        .id(6L)
        .city("Szeged")
        .address("Kossuth Lajos sgt. 76")
        .buildingName("Második Telephely")
        .build());
    userRepository.save(User.builder()
        .id("112003548510441733141")
        .username("wysiomeetingorganizer@gmail.com")
        .role(Role.USER)
        .accountNonExpired(true)
        .accountNonLocked(true)
        .enabled(true)
        .build());
    userRepository.save(User.builder()
        .id("111455286747437812553")
        .username("dombimihaly89@gmail.com")
        .role(Role.USER)
        .accountNonExpired(true)
        .accountNonLocked(true)
        .enabled(true)
        .build());
    userRepository.save(User.builder()
        .id("10769150350006150715113077777")
        .username("recruitment@gmail.com")
        .role(Role.USER)
        .accountNonExpired(true)
        .accountNonLocked(true)
        .enabled(true)
        .build());
    userRepository.save(User.builder()
        .id("99999150350006150715113077777")
        .username("sales.department@gmail.com")
        .role(Role.USER)
        .accountNonExpired(true)
        .accountNonLocked(true)
        .enabled(true)
        .build());
    userRepository.save(User.builder()
        .id("8888150350006150715113077777")
        .username("accounting@gmail.com")
        .role(Role.READER)
        .accountNonExpired(true)
        .accountNonLocked(true)
        .enabled(true)
        .build());
    userRepository.save(User.builder()
        .id("11111110350006150715113077777")
        .username("compliance@gmail.com")
        .role(Role.ADMIN)
        .accountNonExpired(true)
        .accountNonLocked(true)
        .enabled(true)
        .build());
    userRepository.save(User.builder()
        .id("99999910350006150715113077777")
        .username("operation@gmail.com")
        .role(Role.READER)
        .accountNonExpired(true)
        .accountNonLocked(true)
        .enabled(true)
        .build());

    meetingRoomRepository.save(MeetingRoom.builder()
        .id(1L)
        .name("Nagy Tárgyaló")
        .numberOfSeats(5)
        .building(building1)
        .projector(false).build());
    meetingRoomRepository.save(MeetingRoom.builder()
        .id(2L)
        .name("Igazgatói Tárgyaló")
        .numberOfSeats(20)
        .building(building2)
        .projector(true).build());
    meetingRoomRepository.save(MeetingRoom.builder()
        .id(3L)
        .name("Nagy Ablakos Iroda")
        .numberOfSeats(10)
        .building(building3)
        .projector(false).build());
    meetingRoomRepository.save(MeetingRoom.builder()
        .id(4L)
        .name("Második Emeleti Előadó")
        .numberOfSeats(2)
        .building(building4)
        .projector(true).build());
    meetingRoomRepository.save(MeetingRoom.builder()
        .id(5L)
        .name("Kis Iroda")
        .numberOfSeats(8)
        .projector(false)
        .building(building5)
        .build());
    reservationRepository.save(Reservation.builder()
        .id(1L)
        .user(userRepository.findById("112003548510441733141").orElse(null))
        .meetingRoom(meetingRoomRepository.findById(1L).orElse(null))
        .title("Hétfői eligazítás")
        .summary("Megbeszéljük ki mivel haladt tegnap és mivel fog ma foglalkozni.")
        .startingTime(
            (LocalDateTime.of(2020, 3, 2, 10, 0)).toInstant(ZoneOffset.UTC).toEpochMilli())
        .endingTime(
            (LocalDateTime.of(2020, 3, 2, 12, 0)).toInstant(ZoneOffset.UTC).toEpochMilli())
        .build());
    reservationRepository.save(Reservation.builder()
        .id(2L)
        .user(userRepository.findById("112003548510441733141").orElse(null))
        .meetingRoom(meetingRoomRepository.findById(1L).orElse(null))
        .title("Havi értékelés")
        .summary("Tervek elemzése és teljesítményértékelés.")
        .startingTime(
            (LocalDateTime.of(2020, 3, 4, 10, 00)).toInstant(ZoneOffset.UTC).toEpochMilli())
        .endingTime((LocalDateTime.of(2020, 3, 4, 12, 30)).toInstant(ZoneOffset.UTC).toEpochMilli())
        .build());
    reservationRepository.save(Reservation.builder()
        .id(3L)
        .user(userRepository.findById("112003548510441733141").orElse(null))
        .meetingRoom(meetingRoomRepository.findById(2L).orElse(null))
        .title("Daily Meeting")
        .summary("Napi teendők megtárgyalása.")
        .startingTime(
            (LocalDateTime.of(2020, 3, 5, 7, 00)).toInstant(ZoneOffset.UTC).toEpochMilli())
        .endingTime(
            (LocalDateTime.of(2020, 3, 5, 8, 15)).toInstant(ZoneOffset.UTC).toEpochMilli())
        .build());
    reservationRepository.save(Reservation.builder()
        .id(4L)
        .user(userRepository.findById("112003548510441733141").orElse(null))
        .meetingRoom(meetingRoomRepository.findById(1L).orElse(null))
        .title("Havi Záróértekezlet")
        .summary("A havi eredmények kiértékelése.")
        .startingTime(
            (LocalDateTime.of(2020, 2, 27, 8, 00)).toInstant(ZoneOffset.UTC).toEpochMilli())
        .endingTime(
            (LocalDateTime.of(2020, 2, 27, 10, 30)).toInstant(ZoneOffset.UTC).toEpochMilli())
        .build());
    reservationRepository.save(Reservation.builder()
        .id(4L)
        .user(userRepository.findById("112003548510441733141").orElse(null))
        .meetingRoom(meetingRoomRepository.findById(1L).orElse(null))
        .title("Kamarai ügyek")
        .summary("Tanácsadói team fogadása.")
        .startingTime(
            (LocalDateTime.of(2020, 2, 25, 10, 00)).toInstant(ZoneOffset.UTC).toEpochMilli())
        .endingTime(
            (LocalDateTime.of(2020, 2, 25, 11, 30)).toInstant(ZoneOffset.UTC).toEpochMilli())
        .build());
    reservationRepository.save(Reservation.builder()
        .id(4L)
        .user(userRepository.findById("112003548510441733141").orElse(null))
        .meetingRoom(meetingRoomRepository.findById(1L).orElse(null))
        .title("Bankett")
        .summary("Projekt zárórendezvény")
        .startingTime(
            (LocalDateTime.of(2020, 3, 6, 17, 30)).toInstant(ZoneOffset.UTC).toEpochMilli())
        .endingTime(
            (LocalDateTime.of(2020, 3, 6, 20, 00)).toInstant(ZoneOffset.UTC).toEpochMilli())
        .build());
    reservationRepository.save(Reservation.builder()
        .id(5L)
        .user(userRepository.findById("111455286747437812553").orElse(null))
        .meetingRoom(meetingRoomRepository.findById(1L).orElse(null))
        .title("Toborzási ügyek")
        .summary("HR stratégia átformálása.")
        .startingTime(
            (LocalDateTime.of(2020, 3, 2, 8, 00)).toInstant(ZoneOffset.UTC).toEpochMilli())
        .endingTime((LocalDateTime.of(2020, 3, 2, 9, 30)).toInstant(ZoneOffset.UTC).toEpochMilli())
        .build());
    reservationRepository.save(Reservation.builder()
        .id(6L)
        .user(userRepository.findById("111455286747437812553").orElse(null))
        .meetingRoom(meetingRoomRepository.findById(1L).orElse(null))
        .title("Bérszámfejtés")
        .summary("Bérek átszámítása")
        .startingTime(
            (LocalDateTime.of(2020, 3, 7, 8, 00)).toInstant(ZoneOffset.UTC).toEpochMilli())
        .endingTime((LocalDateTime.of(2020, 3, 7, 10, 00)).toInstant(ZoneOffset.UTC).toEpochMilli())
        .build());
    reservationRepository.save(Reservation.builder()
        .id(6L)
        .user(userRepository.findById("111455286747437812553").orElse(null))
        .meetingRoom(meetingRoomRepository.findById(2L).orElse(null))
        .title("Elemzés")
        .summary("Piaci trendek")
        .startingTime(
            (LocalDateTime.of(2020, 3, 3, 10, 00)).toInstant(ZoneOffset.UTC).toEpochMilli())
        .endingTime((LocalDateTime.of(2020, 3, 3, 12, 00)).toInstant(ZoneOffset.UTC).toEpochMilli())
        .build());
  }
}
