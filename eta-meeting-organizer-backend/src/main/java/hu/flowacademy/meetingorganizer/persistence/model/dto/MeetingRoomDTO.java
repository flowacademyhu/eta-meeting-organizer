package hu.flowacademy.meetingorganizer.persistence.model.dto;

import hu.flowacademy.meetingorganizer.persistence.model.MeetingRoom;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Component
public class MeetingRoomDTO {

  private Long id;

  private String name;

  private Integer numberOfSeats;

  private Boolean projector;

  private BuildingDTO building;

  public MeetingRoomDTO(MeetingRoom model) {
    this.setId(model.getId());
    this.setNumberOfSeats(model.getNumberOfSeats());
    this.setProjector(model.getProjector());
    this.setBuilding(new BuildingDTO(model.getBuilding()));
    this.setName(model.getName());
  }

  public MeetingRoom toEntity() {
    MeetingRoom meetingRoom = new MeetingRoom();
    BeanUtils.copyProperties(this, meetingRoom);
    meetingRoom.setBuilding(this.getBuilding().toEntity());
    return meetingRoom;
  }

  public MeetingRoomDTO fromEntity() {
    MeetingRoomDTO meetingRoomDTO = new MeetingRoomDTO();
    BeanUtils.copyProperties(this, meetingRoomDTO);
    meetingRoomDTO.setBuilding(this.getBuilding().fromEntity());
    return meetingRoomDTO;
  }
}
