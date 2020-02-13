package hu.flowacademy.meetingorganizer.service;

import hu.flowacademy.meetingorganizer.persistence.model.MeetingRoom;
import hu.flowacademy.meetingorganizer.persistence.repository.MeetingRoomRepository;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@AllArgsConstructor
@Transactional
public class MeetingRoomService {

  private MeetingRoomRepository meetingRoomRepository;

  public List<MeetingRoom> findAll() {
    return meetingRoomRepository.findAll();
  }

  public Optional<MeetingRoom> findOne(Long id) {
    return meetingRoomRepository.findById(id);
  }

  public MeetingRoom createMeetingRoom(MeetingRoom meetingRoom) {
    return meetingRoomRepository.save(meetingRoom);
  }

  public void deleteMeetingRoom(Long id) {
    meetingRoomRepository.deleteById(id);
  }

  public MeetingRoom updateMeetingRoom(Long id, MeetingRoom meetingRoom) {
    meetingRoom.setId(id);
    return meetingRoomRepository.save(meetingRoom);
  }
}
