package hu.flowacademy.meetingorganizer.persistence.repository;

import hu.flowacademy.meetingorganizer.persistence.model.Reservation;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

  List<Reservation> findByUser_Id(String id);

  List<Reservation> findByMeetingRoom_Id(Long id);

  @Query("SELECT COUNT(r) FROM  Reservation r "
      + "WHERE (r.meetingRoom.id = ?1) "
      + "AND"
      + " (?2 BETWEEN r.startingTime AND r.endingTime)"
      + "OR"
      + " (?3 BETWEEN r.startingTime AND r.endingTime)"
      + "OR"
      + " (r.startingTime >= ?2 AND r.endingTime <= ?3)")
  Long findAllByMeetingRoomIdInInterval(Long userId, Long startingTime, Long endingTime);
}
