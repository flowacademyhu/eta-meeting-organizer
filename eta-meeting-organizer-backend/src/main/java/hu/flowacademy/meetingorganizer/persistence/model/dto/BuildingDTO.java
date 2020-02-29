package hu.flowacademy.meetingorganizer.persistence.model.dto;

import hu.flowacademy.meetingorganizer.persistence.model.Building;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Component
public class BuildingDTO {

  private Long id;

  private String city;

  private String address;

  private String buildingName;

  public BuildingDTO(Building building) {
    this.id = building.getId();
    this.city = building.getCity();
    this.address = building.getAddress();
    this.buildingName = building.getBuildingName();
  }

  public Building toEntity() {
    Building building = new Building();
    BeanUtils.copyProperties(this, building);
    return building;
  }
  public BuildingDTO fromEntity() {
    BuildingDTO buildingDTO = new BuildingDTO();
    BeanUtils.copyProperties(this, buildingDTO);
    return buildingDTO;
  }

}
