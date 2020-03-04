package hu.flowacademy.meetingorganizer.service;

import hu.flowacademy.meetingorganizer.exception.BuildingAddressAlreadyExistsException;
import hu.flowacademy.meetingorganizer.exception.BuildingNameAlreadyExistsException;
import hu.flowacademy.meetingorganizer.exception.BuildingNotFoundException;
import hu.flowacademy.meetingorganizer.exception.MeetingRoomNotFoundException;
import hu.flowacademy.meetingorganizer.exception.ValidationException;
import hu.flowacademy.meetingorganizer.persistence.model.Building;
import hu.flowacademy.meetingorganizer.persistence.model.MeetingRoom;
import hu.flowacademy.meetingorganizer.persistence.model.dto.BuildingDTO;
import hu.flowacademy.meetingorganizer.persistence.model.dto.MeetingRoomDTO;
import hu.flowacademy.meetingorganizer.persistence.repository.BuildingRepository;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import org.springframework.util.StringUtils;

@Service
@Transactional
@AllArgsConstructor
public class BuildingService {

  private BuildingRepository buildingRepository;

  public BuildingDTO createBuilding(BuildingDTO buildingDTO) {
    validateBuildingOnCreate(buildingDTO);
    return new BuildingDTO(buildingRepository.save(buildingDTO.toEntity()));
  }

  public BuildingDTO updateBuilding(Long id, BuildingDTO buildingDTO) {
    validateBuildingOnUpdate(id, buildingDTO);
    buildingRepository.findById(id).orElseThrow(BuildingNotFoundException::new);
    Building building = buildingDTO.toEntity();
    building.setId(id);
    return new BuildingDTO(buildingRepository.save(building));
  }

  public void deleteBuilding(Long id) {
    buildingRepository.deleteById(id);
  }

  public Optional<Building> findOne(Long id) {
    return Optional.of(buildingRepository.findById(id))
        .orElseThrow(BuildingNotFoundException::new);
  }

  public List<Building> findAll() {
    return buildingRepository.findAllByOrderById();
  }

  public List<String> findAllCities() {
    return buildingRepository.findAllCities();
  }

  public List<Building> findAllByCity(String city) {
    return buildingRepository.findAllByCity(city);
  }

  public void validateBuildingOnCreate(BuildingDTO input) {
    validateBuildingData(input);
    if ((!(buildingRepository.findByCityAndBuildingName(input.getCity(), input.getBuildingName()))
        .isEmpty())) {
      throw new BuildingNameAlreadyExistsException();
    }
    if (buildingRepository.findAllAddresses().contains(input.getAddress())) {
      throw new BuildingAddressAlreadyExistsException();
    }
  }

  public void validateBuildingOnUpdate(Long id, BuildingDTO input) {
    validateBuildingData(input);
    Building formerBuilding = buildingRepository.findById(id)
        .orElseThrow(BuildingNotFoundException::new);
/*    List<String> addressList = buildingRepository.findAllAddresses();
    addressList.remove(formerBuilding.getAddress());*/
    if (buildingRepository.findByAddressNotIn(List.of(formerBuilding.getAddress())).contains(input.getAddress())) {
      throw new BuildingAddressAlreadyExistsException();
    }
    List<String> buildingNameList = buildingRepository.findBuildingNamesByCity(input.getCity());
    buildingNameList.remove(formerBuilding.getBuildingName());
    if (buildingNameList.contains(input.getBuildingName())) {
      throw new BuildingNameAlreadyExistsException();
    }
  }

  public void validateBuildingData(BuildingDTO input) {
    if (StringUtils.isEmpty(input.getBuildingName())) {
      throw new ValidationException("building.name");
    }
    if (StringUtils.isEmpty(input.getCity())) {
      throw new ValidationException("building.city");
    }
    if (StringUtils.isEmpty(input.getAddress())) {
      throw new ValidationException("building.city");
    }
  }

  public void deleteAllById(List<Long> id) {
    buildingRepository.deleteByIdIn(id);
  }
}
