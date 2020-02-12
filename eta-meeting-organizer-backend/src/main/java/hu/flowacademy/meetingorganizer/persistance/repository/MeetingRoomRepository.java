package hu.flowacademy.meetingorganizer.persistance.repository;

import hu.flowacademy.meetingorganizer.persistance.model.MeetingRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MeetingRoomRepository extends JpaRepository<MeetingRoom, Long> {

}
