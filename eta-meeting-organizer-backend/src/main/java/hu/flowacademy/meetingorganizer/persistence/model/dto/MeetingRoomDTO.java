package hu.flowacademy.meetingorganizer.persistence.model.dto;

import hu.flowacademy.meetingorganizer.persistence.model.MeetingRoom;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MeetingRoomDTO {

  private Long id;

  private String generatedName;

  private Integer numberOfSeats;

  private Boolean projector;

  private BuildingDTO building;

  public MeetingRoomDTO(MeetingRoom model) {
    MeetingRoomDTO dto = new MeetingRoomDTO();
    dto.setId(model.getId());
    dto.setNumberOfSeats(model.getNumberOfSeats());
    dto.setProjector(model.getProjector());
    dto.setBuilding(new BuildingDTO(model.getBuilding()));
    dto.setGeneratedName(
        model.getBuilding().getCity() + " – " + model.getBuilding().getAddress() + " – " + model
            .getName());
  }

}
