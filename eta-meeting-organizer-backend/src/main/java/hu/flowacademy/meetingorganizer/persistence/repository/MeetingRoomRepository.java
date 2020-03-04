package hu.flowacademy.meetingorganizer.persistence.repository;

import hu.flowacademy.meetingorganizer.persistence.model.MeetingRoom;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MeetingRoomRepository extends JpaRepository<MeetingRoom, Long> {

  List<MeetingRoom> findByBuilding_Id(Long id);

  List<MeetingRoom> findAllByOrderById();
  
  @Modifying
  void deleteByIdIn(List<Long> id);

  List<MeetingRoom> findByBuilding_IdAndName(Long id, String name);

  @Query("SELECT DISTINCT name FROM MeetingRoom m WHERE (Building.id = ?1)")
  List<MeetingRoom> findByBuilding_Id(Long id);
}
