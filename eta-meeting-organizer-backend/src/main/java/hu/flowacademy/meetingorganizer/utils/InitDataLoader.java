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
        .address("Kelemen Jancsi utca 11 2/6")
        .buildingName("Kék épület")
        .build());
    final var building2 = buildingRepository.save(Building.builder()
        .id(2L)
        .city("Kecskemét")
        .address("Kis István utca 131")
        .buildingName("Sarki zöld épület")
        .build());
    final var building3 = buildingRepository.save(Building.builder()
        .id(3L)
        .city("Salgótarján")
        .address("Szegedi út 125")
        .buildingName("Piac melletti épület")
        .build());
    final var building4 = buildingRepository.save(Building.builder()
        .id(4L)
        .city("Göd")
        .address("Vörös utca 38-40")
        .buildingName("Marika ABC melletti épület")
        .build());
    final var building5 = buildingRepository.save(Building.builder()
        .id(5L)
        .city("Győr")
        .address("Győri utca 28 3/28")
        .buildingName("Kék osztriga bár melletti épület")
        .build());
    final var building6 = buildingRepository.save(Building.builder()
        .id(6L)
        .city("Budapest")
        .address("Kelemen Ákos utca 12 2/6")
        .buildingName("Kék kakas")
        .build());

    userRepository.save(User.builder()
        .id("112003548510441733141")
        .username("wysiomeetingorganizer@gmail.com")
        .role(Role.ADMIN)
        .accountNonExpired(true)
        .accountNonLocked(true)
        .enabled(true)
        .build());
    userRepository.save(User.builder()
        .id("10769150350006150715113077777")
        .username("isti@gmail.com")
        .role(Role.USER)
        .accountNonExpired(true)
        .accountNonLocked(true)
        .enabled(true)
        .build());
    userRepository.save(User.builder()
        .id("99999150350006150715113077777")
        .username("klau@gmail.com")
        .role(Role.USER)
        .accountNonExpired(true)
        .accountNonLocked(true)
        .enabled(true)
        .build());
    userRepository.save(User.builder()
        .id("8888150350006150715113077777")
        .username("htpeti@gmail.com")
        .role(Role.READER)
        .accountNonExpired(true)
        .accountNonLocked(true)
        .enabled(true)
        .build());
    userRepository.save(User.builder()
        .id("11111110350006150715113077777")
        .username("berentep@gmail.com")
        .role(Role.ADMIN)
        .accountNonExpired(true)
        .accountNonLocked(true)
        .enabled(true)
        .build());
    userRepository.save(User.builder()
        .id("99999910350006150715113077777")
        .username("schlange@gmail.com")
        .role(Role.READER)
        .accountNonExpired(true)
        .accountNonLocked(true)
        .enabled(true)
        .build());

    meetingRoomRepository.save(MeetingRoom.builder()
        .id(1L)
        .name("Ügyfél fogadó")
        .numberOfSeats(5)
        .building(building1)
        .projector(false).build());
    meetingRoomRepository.save(MeetingRoom.builder()
        .id(2L)
        .name("Igazgatói tárgyaló")
        .numberOfSeats(20)
        .building(building2)
        .projector(true).build());
    meetingRoomRepository.save(MeetingRoom.builder()
        .id(3L)
        .name("Kék ajtós iroda")
        .numberOfSeats(10)
        .building(building3)
        .projector(true).build());
    meetingRoomRepository.save(MeetingRoom.builder()
        .id(4L)
        .name("Piros ajtós iroda")
        .numberOfSeats(2)
        .building(building4)
        .projector(false).build());
    meetingRoomRepository.save(MeetingRoom.builder()
        .id(5L)
        .name("Zöld iroda")
        .numberOfSeats(8)
        .projector(false)
        .building(building5)
        .build());
    reservationRepository.save(Reservation.builder()
        .id(1L)
        .user(userRepository.findById("112003548510441733141").orElse(null))
        .meetingRoom(meetingRoomRepository.findById(1L).orElse(null))
        .title("Napi meeting")
        .summary("Megbeszéljük ki mivel haladt tegnap és mivel fog ma foglalkozni.")
        .startingTime(
            (LocalDateTime.of(2020, 2, 25, 16, 0)).toInstant(ZoneOffset.UTC).toEpochMilli())
        .endingTime(
            (LocalDateTime.of(2020, 2, 25, 18, 0)).toInstant(ZoneOffset.UTC).toEpochMilli())
        .build());
    reservationRepository.save(Reservation.builder()
        .id(2L)
        .user(userRepository.findById("11111110350006150715113077777").orElse(null))
        .meetingRoom(meetingRoomRepository.findById(2L).orElse(null))
        .title("Flow tárgyalás")
        .summary("Új ügyfelek felkutatása.")
        .startingTime(
            (LocalDateTime.of(2020, 2, 26, 9, 0)).toInstant(ZoneOffset.UTC).toEpochMilli())
        .endingTime((LocalDateTime.of(2020, 2, 26, 9, 15)).toInstant(ZoneOffset.UTC).toEpochMilli())
        .build());
    reservationRepository.save(Reservation.builder()
        .id(3L)
        .user(userRepository.findById("112003548510441733141").orElse(null))
        .meetingRoom(meetingRoomRepository.findById(1L).orElse(null))
        .title("Húsvét")
        .summary("húsvéti program megbeszélése Pennywise-al")
        .startingTime(
            (LocalDateTime.of(2020, 2, 27, 12, 0)).toInstant(ZoneOffset.UTC).toEpochMilli())
        .endingTime(
            (LocalDateTime.of(2020, 2, 27, 14, 15)).toInstant(ZoneOffset.UTC).toEpochMilli())
        .build());
    reservationRepository.save(Reservation.builder()
        .id(4L)
        .user(userRepository.findById("112003548510441733141").orElse(null))
        .meetingRoom(meetingRoomRepository.findById(2L).orElse(null))
        .title("Karácsony")
        .summary("Megbeszéljük hogy mikor tartsuk illetve ki melyik zenekart szeretné ")
        .startingTime(
            (LocalDateTime.of(2020, 2, 27, 16, 0)).toInstant(ZoneOffset.UTC).toEpochMilli())
        .endingTime(
            (LocalDateTime.of(2020, 2, 27, 16, 30)).toInstant(ZoneOffset.UTC).toEpochMilli())
        .build());
    reservationRepository.save(Reservation.builder()
        .id(5L)
        .user(userRepository.findById("112003548510441733141").orElse(null))
        .meetingRoom(meetingRoomRepository.findById(3L).orElse(null))
        .title("Tesla")
        .summary("Tesla gyár látogatásának időpontja")
        .startingTime(
            (LocalDateTime.of(2020, 2, 28, 6, 0)).toInstant(ZoneOffset.UTC).toEpochMilli())
        .endingTime((LocalDateTime.of(2020, 2, 28, 6, 45)).toInstant(ZoneOffset.UTC).toEpochMilli())
        .build());
  }
}
