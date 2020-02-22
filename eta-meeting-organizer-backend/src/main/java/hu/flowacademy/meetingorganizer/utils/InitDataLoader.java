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

    buildingRepository.save(Building.builder()
        .id(1l)
        .city("Budapest")
        .address("Kelemen Jancsi utca 11 2/6")
        .build());
    buildingRepository.save(Building.builder()
        .id(2l)
        .city("Kecskemét")
        .address("Kis István utca 131")
        .build());
    buildingRepository.save(Building.builder()
        .id(3l)
        .city("Salgótarján")
        .address("Szegedi út 125")
        .build());
    buildingRepository.save(Building.builder()
        .id(4l)
        .city("Göd")
        .address("Vörös utca 38-40")
        .build());
    buildingRepository.save(Building.builder()
        .id(5l)
        .city("Győr")
        .address("Győri utca 28 3/28")
        .build());

    meetingRoomRepository.save(MeetingRoom.builder()
        .id(1l)
        .name("Ügyfél fogadó")
        .building(buildingRepository.getOne(1l))
        .numberOfSeats(5)
        .projector(false).build());
    meetingRoomRepository.save(MeetingRoom.builder()
        .id(2l)
        .name("Igazgatói tárgyaló")
        .building(buildingRepository.getOne(2l))
        .numberOfSeats(20)
        .projector(true).build());
    meetingRoomRepository.save(MeetingRoom.builder()
        .id(3l)
        .name("Kék ajtós iroda")
        .numberOfSeats(10)
        .projector(true).build());
    meetingRoomRepository.save(MeetingRoom.builder()
        .id(4l)
        .name("Piros ajtós iroda")
        .numberOfSeats(2)
        .projector(false).build());
    meetingRoomRepository.save(MeetingRoom.builder()
        .id(5l)
        .name("Zöld iroda")
        .numberOfSeats(8)
        .projector(false).build());

    userRepository.save(User.builder()
        .id("111455286747437812553")
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
        .id(1l)
        .user(userRepository.findById("111455286747437812553").orElse(null))
        .title("Napi meeting")
        .meetingRoom(meetingRoomRepository.getOne(1l))
        .summary("Megbeszéljük ki mivel haladt tegnap és mivel fog ma foglalkozni.")
        .startingTime(LocalDateTime.of(2020, 2, 17, 16, 00))
        .endingTime(LocalDateTime.of(2020, 2, 17, 18, 00)).build());
    reservationRepository.save(Reservation.builder()
        .id(2l)
        .user(userRepository.findById("111455286747437812553").orElse(null))
        .title("Flow tárgyalás")
        .summary("Új ügyfelek felkutatása.")
        .startingTime(LocalDateTime.now())
        .endingTime(LocalDateTime.now()).build());
    reservationRepository.save(Reservation.builder()
        .id(3l)
        .user(userRepository.findById("10769150350006150715113077777").orElse(null))
        .title("Húsvét")
        .meetingRoom(meetingRoomRepository.getOne(2l))
        .summary("húsvéti program megbeszélése Pennywise-al")
        .startingTime(LocalDateTime.of(2020, 2, 18, 16, 00))
        .endingTime(LocalDateTime.of(2020, 2, 18, 18, 00)).build());
    reservationRepository.save(Reservation.builder()
        .id(4l)
        .user(userRepository.findById("10769150350006150715113077777").orElse(null))
        .title("Karácsony")
        .summary("Megbeszéljük hogy mikor tartsuk illetve ki melyik zenekart szeretné ")
        .startingTime(LocalDateTime.now())
        .endingTime(LocalDateTime.now()).build());
    reservationRepository.save(Reservation.builder()
        .id(5l)
        .user(userRepository.findById("10769150350006150715113082367").orElse(null))
        .title("Tesla")
        .summary("Tesla gyár látogatásának időpontja")
        .startingTime(LocalDateTime.now())
        .endingTime(LocalDateTime.now()).build());
  }
}