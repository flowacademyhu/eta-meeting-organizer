package hu.flowacademy.meetingorganizer.service;

import hu.flowacademy.meetingorganizer.persistence.model.MeetingRoom;
import hu.flowacademy.meetingorganizer.persistence.model.dto.MeetingRoomDTO;
import hu.flowacademy.meetingorganizer.persistence.repository.MeetingRoomRepository;
import java.util.List;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
@Transactional
public class MeetingRoomService {

  private MeetingRoomRepository meetingRoomRepository;

  public List<MeetingRoom> findAll(Integer pageNumber, Integer pageSize) {
    return meetingRoomRepository
        .findAll(PageRequest.of(pageNumber, pageSize)).getContent();
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

  public MeetingRoomDTO create(MeetingRoom meetingRoom) {
    return new MeetingRoomDTO(meetingRoomRepository.save(meetingRoom));
  }
}
