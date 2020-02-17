package hu.flowacademy.meetingorganizer.service;

import hu.flowacademy.meetingorganizer.persistence.model.MeetingRoom;
import hu.flowacademy.meetingorganizer.persistence.repository.MeetingRoomRepository;
import java.util.ArrayList;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
@Transactional
public class MeetingRoomService {

  private MeetingRoomRepository meetingRoomRepository;

  public List<MeetingRoom> findAll(Integer pageNumber, Integer pageSize) {
    Pageable pageable = PageRequest.of(pageNumber, pageSize);
    Page<MeetingRoom> pagedResult = meetingRoomRepository.findAll(pageable);
    return pagedResult.hasContent() ? pagedResult.getContent() : new ArrayList<MeetingRoom>();
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
