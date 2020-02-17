package hu.flowacademy.meetingorganizer.utils;

import hu.flowacademy.meetingorganizer.persistence.model.Building;
import hu.flowacademy.meetingorganizer.persistence.model.MeetingRoom;
import hu.flowacademy.meetingorganizer.persistence.model.Reservation;
import hu.flowacademy.meetingorganizer.persistence.model.Role;
import hu.flowacademy.meetingorganizer.persistence.repository.BuildingRepository;
import hu.flowacademy.meetingorganizer.persistence.repository.MeetingRoomRepository;
import hu.flowacademy.meetingorganizer.persistence.repository.ReservationRepository;
import hu.flowacademy.meetingorganizer.persistence.model.User;
import hu.flowacademy.meetingorganizer.persistence.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import javax.annotation.PostConstruct;
import java.time.LocalDateTime;

@Component
@Transactional
@AllArgsConstructor
public class initDataLoader {

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

    reservationRepository.save(Reservation.builder()
        .id(1l)
        .user(userRepository.getOne(1l))
        .title("Napi meeting")
        .summary("Megbeszéljük ki mivel haladt tegnap és mivel fog ma foglalkozni.")
        .startingTime(LocalDateTime.now())
        .endingTime(LocalDateTime.of(2020, 2, 17, 18, 00)).build());
    reservationRepository.save(Reservation.builder()
        .id(2l)
        .user(userRepository.getOne(1l))
        .title("Flow tárgyalás")
        .summary("Új ügyfelek felkutatása.")
        .startingTime(LocalDateTime.now())
        .endingTime(LocalDateTime.now()).build());
    reservationRepository.save(Reservation.builder()
        .id(3l)
        .title("Húsvét")
        .summary("húsvéti program megbeszélése Pennywise-al")
        .startingTime(LocalDateTime.now())
        .endingTime(LocalDateTime.now()).build());
    reservationRepository.save(Reservation.builder()
        .id(4l)
        .title("Karácsony")
        .summary("Megbeszéljük hogy mikor tartsuk illetve ki melyik zenekart szeretné ")
        .startingTime(LocalDateTime.now())
        .endingTime(LocalDateTime.now()).build());
    reservationRepository.save(Reservation.builder()
        .id(5l)
        .title("Tesla")
        .summary("Tesla gyár látogatásának időpontja")
        .startingTime(LocalDateTime.now())
        .endingTime(LocalDateTime.now()).build());

    userRepository.save(User.builder()
        .id(1l)
        .name("Bandi")
        .email("bandi@gmail.com")
        .role(Role.USER).build());
    userRepository.save(User.builder()
        .id(2l)
        .name("Károly")
        .email("karcsi@gmail.com")
        .role(Role.ADMIN).build());
    userRepository.save(User.builder()
        .id(3l)
        .name("Zita")
        .email("zita@gmail.com")
        .role(Role.ADMIN).build());
    userRepository.save(User.builder()
        .id(4l)
        .name("Zsuzsa")
        .email("tuzes_zsuzsi@gmail.com")
        .role(Role.USER).build());
    userRepository.save(User.builder()
        .id(5l)
        .name("Béla")
        .email("bela@gmail.com")
        .role(Role.USER).build());

    meetingRoomRepository.save(MeetingRoom.builder()
        .id(1l)
        .name("Ügyfél fogadó")
        .numberOfSeats(5)
        .projector(false).build());
    meetingRoomRepository.save(MeetingRoom.builder()
        .id(2l)
        .name("Igazgatói tárgyaló")
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
  }
}