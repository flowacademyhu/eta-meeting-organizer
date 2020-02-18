package hu.flowacademy.meetingorganizer.persistence.model.dto;

import hu.flowacademy.meetingorganizer.persistence.model.Building;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BuildingDTO {

  private Long id;

  private String city;

  private String address;

  public BuildingDTO(Building building) {
    this.id = building.getId();
    this.city = building.getCity();
    this.address = building.getAddress();
  }
  
}
