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
        .id("10769150350006150715113082367")
        .username("misi@gmail.com")
        .isVerifiedByAdmin(true)
        .role(Role.ADMIN)
        .accountNonExpired(true)
        .accountNonLocked(true)
        .enabled(true)
        .build());
    userRepository.save(User.builder()
        .id("10769150350006150715113077777")
        .username("isti@gmail.com")
        .isVerifiedByAdmin(false)
        .role(Role.USER)
        .accountNonExpired(true)
        .accountNonLocked(true)
        .enabled(true)
        .build());
    userRepository.save(User.builder()
        .id("99999150350006150715113077777")
        .username("klau@gmail.com")
        .isVerifiedByAdmin(false)
        .role(Role.USER)
        .accountNonExpired(true)
        .accountNonLocked(true)
        .enabled(true)
        .build());
    userRepository.save(User.builder()
        .id("8888150350006150715113077777")
        .username("htpeti@gmail.com")
        .isVerifiedByAdmin(true)
        .role(Role.READER)
        .accountNonExpired(true)
        .accountNonLocked(true)
        .enabled(true)
        .build());
    userRepository.save(User.builder()
        .id("11111110350006150715113077777")
        .username("berentep@gmail.com")
        .isVerifiedByAdmin(true)
        .role(Role.ADMIN)
        .accountNonExpired(true)
        .accountNonLocked(true)
        .enabled(true)
        .build());
    userRepository.save(User.builder()
        .id("99999910350006150715113077777")
        .username("schlange@gmail.com")
        .isVerifiedByAdmin(true)
        .role(Role.READER)
        .accountNonExpired(true)
        .accountNonLocked(true)
        .enabled(true)
        .build());

    reservationRepository.save(Reservation.builder()
        .id(1L)
        .user(userRepository.findById("99999150350006150715113077777").orElse(null))
        .title("Napi meeting")
        .summary("Megbeszéljük ki mivel haladt tegnap és mivel fog ma foglalkozni.")
        .startingTime(LocalDateTime.of(2020, 2, 17, 16, 00))
        .endingTime(LocalDateTime.of(2020, 2, 17, 18, 00)).build());
    reservationRepository.save(Reservation.builder()
        .id(2L)
        .user(userRepository.findById("99999150350006150715113077777").orElse(null))
        .title("Flow tárgyalás")
        .summary("Új ügyfelek felkutatása.")
        .startingTime(LocalDateTime.now())
        .endingTime(LocalDateTime.now()).build());
    reservationRepository.save(Reservation.builder()
        .id(3L)
        .user(userRepository.findById("10769150350006150715113077777").orElse(null))
        .title("Húsvét")
        .summary("húsvéti program megbeszélése Pennywise-al")
        .startingTime(LocalDateTime.now())
        .endingTime(LocalDateTime.now()).build());
    reservationRepository.save(Reservation.builder()
        .id(4L)
        .user(userRepository.findById("10769150350006150715113077777").orElse(null))
        .title("Karácsony")
        .summary("Megbeszéljük hogy mikor tartsuk illetve ki melyik zenekart szeretné ")
        .startingTime(LocalDateTime.now())
        .endingTime(LocalDateTime.now()).build());
    reservationRepository.save(Reservation.builder()
        .id(5L)
        .user(userRepository.findById("10769150350006150715113082367").orElse(null))
        .title("Tesla")
        .summary("Tesla gyár látogatásának időpontja")
        .startingTime(LocalDateTime.now())
        .endingTime(LocalDateTime.now()).build());

    meetingRoomRepository.save(MeetingRoom.builder()
        .id(1l)
        .name("Ügyfél fogadó")
        .numberOfSeats(5)
        .building(building1)
        .projector(false).build());
    meetingRoomRepository.save(MeetingRoom.builder()
        .id(2l)
        .name("Igazgatói tárgyaló")
        .numberOfSeats(20)
        .building(building2)
        .projector(true).build());
    meetingRoomRepository.save(MeetingRoom.builder()
        .id(3l)
        .name("Kék ajtós iroda")
        .numberOfSeats(10)
        .building(building3)
        .projector(true).build());
    meetingRoomRepository.save(MeetingRoom.builder()
        .id(4l)
        .name("Piros ajtós iroda")
        .numberOfSeats(2)
        .building(building4)
        .projector(false).build());
    meetingRoomRepository.save(MeetingRoom.builder()
        .id(5l)
        .name("Zöld iroda")
        .numberOfSeats(8)
        .projector(false)
        .building(building5)
        .build());
  }
}