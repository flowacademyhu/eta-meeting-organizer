package hu.flowacademy.meetingorganizer.service;

import hu.flowacademy.meetingorganizer.exception.MeetingRoomNameAlreadyExistsException;
import hu.flowacademy.meetingorganizer.exception.MeetingRoomNotFoundException;
import hu.flowacademy.meetingorganizer.exception.ValidationException;
import hu.flowacademy.meetingorganizer.persistence.model.MeetingRoom;
import hu.flowacademy.meetingorganizer.persistence.model.dto.MeetingRoomDTO;
import hu.flowacademy.meetingorganizer.persistence.repository.MeetingRoomRepository;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

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
    return Optional.of(meetingRoomRepository.findById(id).map(MeetingRoomDTO::new))
        .orElseThrow(() -> new MeetingRoomNotFoundException(id));
  }

  public void deleteMeetingRoom(Long id) {
    meetingRoomRepository.deleteById(id);
  }

  public MeetingRoomDTO updateMeetingRoom(Long id, MeetingRoomDTO meetingRoomDTO) {
    meetingRoomRepository.findById(id).orElseThrow(() -> new MeetingRoomNotFoundException(id));
    validateMeetingRoomOnUpdate(meetingRoomDTO);
    MeetingRoom meetingRoom = meetingRoomDTO.toEntity();
    meetingRoom.setId(id);
    return new MeetingRoomDTO(meetingRoomRepository.save(meetingRoom));
  }

  public List<MeetingRoomDTO> findByBuildingId(Long id) {
    return meetingRoomRepository.findByBuilding_Id(id).stream().map(MeetingRoomDTO::new)
        .collect(Collectors.toList());
  }

  public MeetingRoomDTO create(MeetingRoomDTO meetingRoomDTO) {
    validateMeetingRoomOnCreate(meetingRoomDTO);
    return new MeetingRoomDTO(meetingRoomRepository.save(meetingRoomDTO.toEntity()));
  }

  public void validateMeetingRoomOnCreate(MeetingRoomDTO input) {
    validateMeetingRoomData(input);
    if ((!(meetingRoomRepository
        .findByBuilding_AddressAndName(input.getBuilding().getAddress(), input.getName()))
        .isEmpty())) {
      throw new MeetingRoomNameAlreadyExistsException(input.getName());
    }
  }

  public void validateMeetingRoomOnUpdate(MeetingRoomDTO input) {
    validateMeetingRoomData(input);
    List<MeetingRoom> resultList = meetingRoomRepository
        .findByBuilding_AddressAndName(input.getBuilding().getAddress(), input.getName());
    resultList.remove(input.toEntity());
    if (!(resultList.isEmpty())) {
      throw new MeetingRoomNameAlreadyExistsException(input.getName());
    }
  }

  public void validateMeetingRoomData(MeetingRoomDTO input) {
    if (Objects.isNull(input.getBuilding())) {
      throw new ValidationException("You need to provide a building to create a meeting room!");
    }
    if (StringUtils.isEmpty(input.getName())) {
      throw new ValidationException("Meeting room name is necessary to create a meeting room!");
    }
    if (Objects.isNull(input.getNumberOfSeats())) {
      throw new ValidationException("Number of seats is necessary to create a meeting room!");
    }
    if (Objects.isNull(input.getProjector())) {
      throw new ValidationException("Projector cannot be null!");
    }
  }
}
