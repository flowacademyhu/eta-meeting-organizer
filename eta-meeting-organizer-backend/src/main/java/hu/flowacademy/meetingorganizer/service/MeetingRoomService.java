package hu.flowacademy.meetingorganizer.service;

import hu.flowacademy.meetingorganizer.persistence.model.MeetingRoom;
import hu.flowacademy.meetingorganizer.persistence.model.dto.MeetingRoomDTO;
import hu.flowacademy.meetingorganizer.persistence.repository.MeetingRoomRepository;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
@Transactional
public class MeetingRoomService {

  private MeetingRoomRepository meetingRoomRepository;

  public List<MeetingRoomDTO> findAll() {
    return meetingRoomRepository
        .findAllByOrderById().stream().map(MeetingRoomDTO::new).collect(
            Collectors.toList());
  }

  public Optional<MeetingRoomDTO> findOne(Long id) {
    return meetingRoomRepository.findById(id).map(MeetingRoomDTO::new);
  }

  public void deleteMeetingRoom(Long id) {
    meetingRoomRepository.deleteById(id);
  }

  public MeetingRoomDTO updateMeetingRoom(Long id, MeetingRoomDTO dto) {
    MeetingRoom meetingRoom = dto.toEntity();
    meetingRoom.setId(id);
    return new MeetingRoomDTO(meetingRoomRepository.save(meetingRoom));
  }

  public List<MeetingRoomDTO> findByBuildingId(Long id) {
    return meetingRoomRepository.findByBuilding_Id(id).stream().map(MeetingRoomDTO::new).collect(Collectors.toList());
  }

  public MeetingRoomDTO create(MeetingRoomDTO meetingRoom) {
    return new MeetingRoomDTO(meetingRoomRepository.save(meetingRoom.toEntity()));
  }

  public void deleteMeetingRoomByCheckBox(ArrayList<Long> id ) {
    id.stream().forEach(x -> meetingRoomRepository.deleteById(x));
  }
}
