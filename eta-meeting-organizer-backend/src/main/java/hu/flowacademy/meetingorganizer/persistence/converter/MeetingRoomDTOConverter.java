package hu.flowacademy.meetingorganizer.persistence.converter;

import hu.flowacademy.meetingorganizer.persistence.model.MeetingRoom;
import hu.flowacademy.meetingorganizer.persistence.model.dto.BuildingDTO;
import hu.flowacademy.meetingorganizer.persistence.model.dto.MeetingRoomDTO;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class MeetingRoomDTOConverter {

  public MeetingRoomDTO convert(MeetingRoom model) {
    MeetingRoomDTO dto = new MeetingRoomDTO();
    dto.setId(model.getId());
    dto.setNumberOfSeats(model.getNumberOfSeats());
    dto.setProjector(model.getProjector());
    dto.setBuilding(new BuildingDTO(model.getBuilding()));
    dto.setGeneratedName(
        model.getBuilding().getCity() + " – " + model.getBuilding().getAddress() + " – " + model
            .getName());
    return dto;
  }

  public List<MeetingRoomDTO> convertList(List<MeetingRoom> modelList) {
    List<MeetingRoomDTO> dtoList = new ArrayList<>();
    for (MeetingRoom meetingRoom : modelList) {
      dtoList.add(convert(meetingRoom));
    }
    return dtoList;
  }
}
