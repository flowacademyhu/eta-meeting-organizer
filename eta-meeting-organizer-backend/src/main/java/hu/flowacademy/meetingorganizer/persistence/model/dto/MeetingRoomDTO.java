package hu.flowacademy.meetingorganizer.persistence.model.dto;

import hu.flowacademy.meetingorganizer.persistence.model.Building;
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

  private Building building;

}
