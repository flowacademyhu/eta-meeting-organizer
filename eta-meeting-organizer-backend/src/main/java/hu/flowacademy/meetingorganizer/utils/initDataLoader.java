package utils;

import hu.flowacademy.meetingorganizer.persistence.model.Building;
import hu.flowacademy.meetingorganizer.persistence.model.Reservation;
import hu.flowacademy.meetingorganizer.persistence.repository.BuildingRepository;
import hu.flowacademy.meetingorganizer.persistence.repository.ReservationRepository;
import hu.flowacademy.meetingorganizer.persistence.model.User;
import hu.flowacademy.meetingorganizer.persistence.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.time.LocalDateTime;

import static hu.flowacademy.meetingorganizer.persistence.model.Role.ADMIN;
import static hu.flowacademy.meetingorganizer.persistence.model.Role.USER;

@Component
@Transactional
@AllArgsConstructor
public class initDataLoader {

  private final BuildingRepository buildingRepository;
  private final ReservationRepository reservationRepository;
  private final UserRepository userRepository;

  @PostConstruct
  public void init() {
    buildingRepository.save(Building.builder()
        .city("Budapest")
        .address("Kelemen Jancsi utca 11 2/6")
        .build());
    buildingRepository.save(Building.builder()
        .city("Kecskemét")
        .address("Kis István utca 131")
        .build());
    buildingRepository.save(Building.builder()
        .city("Salgótarján")
        .address("Szegedi út 125")
        .build());
    buildingRepository.save(Building.builder()
        .city("Göd")
        .address("Vörös utca 38-40")
        .build());
    buildingRepository.save(Building.builder()
        .city("Győr")
        .address("Győri utca 28 3/28")
        .build());

    reservationRepository.save(Reservation.builder()
        .title("Napi meeting")
        .summary("Megbeszéljük ki mivel haladt tegnap és mivel fog ma foglalkozni.")
        .startingTime(LocalDateTime.parse("2020-02-01 10:30"))
        .endingTime(LocalDateTime.parse("2020-02-01 11:30")).build());
    reservationRepository.save(Reservation.builder()
        .title("Flow tárgyalás")
        .summary("Új ügyfelek felkutatása.")
        .startingTime(LocalDateTime.parse("2020-01-01 10:30"))
        .endingTime(LocalDateTime.parse("2020-01-01 13:30")).build());
    reservationRepository.save(Reservation.builder()
        .title("Húsvét")
        .summary("húsvéti program megbeszélése Pennywise-al")
        .startingTime(LocalDateTime.parse("2020-04-01 10:30"))
        .endingTime(LocalDateTime.parse("2020-04-01 13:30")).build());
    reservationRepository.save(Reservation.builder()
        .title("Karácsony")
        .summary("Megbeszéljük hogy mikor tartsuk illetve ki melyik zenekart szeretné ")
        .startingTime(LocalDateTime.parse("2020-05-01 10:30"))
        .endingTime(LocalDateTime.parse("2020-05-01 13:30")).build());
    reservationRepository.save(Reservation.builder()
        .title("Tesla")
        .summary("Tesla gyár látogatásának időpontja")
        .startingTime(LocalDateTime.parse("2020-05-01 10:30"))
        .endingTime(LocalDateTime.parse("2020-05-01 13:30")).build());

    userRepository.save(User.builder()
        .name("Bandi")
        .email("bandi@gmail.com")
        .role(USER).build());
    userRepository.save(User.builder()
        .name("Károly")
        .email("karcsi@gmail.com")
        .role(ADMIN).build());
    userRepository.save(User.builder()
        .name("Zita")
        .email("zita@gmail.com")
        .role(ADMIN).build());
    userRepository.save(User.builder()
        .name("Zsuzsa")
        .email("tuzes_zsuzsi@gmail.com")
        .role(USER).build());
    userRepository.save(User.builder()
        .name("Béla")
        .email("bela@gmail.com")
        .role(USER).build());
  }
}
