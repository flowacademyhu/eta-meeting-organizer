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
      + "WHERE (r.meetingRoom.id = ?1 AND ?2 BETWEEN r.startingTime AND r.endingTime) "
      + "OR"
      + " (r.meetingRoom.id = ?1 AND ?3 BETWEEN r.startingTime AND r.endingTime)"
      + "OR"
      + " (r.meetingRoom.id = ?1 AND r.startingTime >= ?2 AND r.endingTime <= ?3)")
  Long findAllByMeetingRoomIdInInterval(Long id, Long startingTime, Long endingTime);

  @Query("SELECT COUNT(r) FROM  Reservation r "
      + "WHERE (r.meetingRoom.id = ?1 AND r.id != ?2 AND ?3 BETWEEN r.startingTime AND r.endingTime) "
      + "OR"
      + " (r.meetingRoom.id = ?1 AND r.id != ?2 AND ?4 BETWEEN r.startingTime AND r.endingTime)"
      + "OR"
      + " (r.meetingRoom.id = ?1 AND r.id != ?2 AND r.startingTime >= ?3 AND r.endingTime <= ?4)")
  Long findAllByMeetingRoomIdInIntervalForUpdate(Long id, Long reservationId, Long startingTime, Long endingTime);
}
