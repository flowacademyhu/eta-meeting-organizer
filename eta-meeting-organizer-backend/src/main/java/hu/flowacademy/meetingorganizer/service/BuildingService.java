package hu.flowacademy.meetingorganizer.service;

import hu.flowacademy.meetingorganizer.exception.BuildingAddressAlreadyExistsException;
import hu.flowacademy.meetingorganizer.exception.BuildingNameAlreadyExistsException;
import hu.flowacademy.meetingorganizer.exception.BuildingNotFoundException;
import hu.flowacademy.meetingorganizer.exception.ValidationException;
import hu.flowacademy.meetingorganizer.persistence.model.Building;
import hu.flowacademy.meetingorganizer.persistence.model.dto.BuildingDTO;
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
    buildingRepository.findById(id).orElseThrow(() -> new BuildingNotFoundException(id));
    validateBuildingOnUpdate(buildingDTO);
    Building building = buildingDTO.toEntity();
    building.setId(id);
    return new BuildingDTO(buildingRepository.save(building));
  }

  public void deleteBuilding(Long id) {
    buildingRepository.deleteById(id);
  }

  public Optional<Building> findOne(Long id) {
    return Optional.of(buildingRepository.findById(id))
        .orElseThrow(() -> new BuildingNotFoundException(id));
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
      throw new BuildingNameAlreadyExistsException(input.getBuildingName());
    }
    if (buildingRepository.findAllAddresses().contains(input.getAddress())) {
      throw new BuildingAddressAlreadyExistsException(input.getAddress());
    }
  }

  public void validateBuildingOnUpdate(BuildingDTO input) {
    validateBuildingData(input);
    List<Building> result = buildingRepository
        .findByCityAndBuildingName(input.getCity(), input.getBuildingName());
    result.remove(input.toEntity());
    if (!(result.isEmpty()) && (buildingRepository.findAllAddresses()
        .contains(input.getAddress()))) {
      throw new BuildingNameAlreadyExistsException(input.getBuildingName());
    }
  }

  public void validateBuildingData(BuildingDTO input) {
    if (StringUtils.isEmpty(input.getBuildingName())) {
      throw new ValidationException("Building name is necessary to create a building!");
    }
    if (StringUtils.isEmpty(input.getCity())) {
      throw new ValidationException("City is necessary to create a building!");
    }
    if (StringUtils.isEmpty(input.getAddress())) {
      throw new ValidationException("Address is necessary to create a building!");
    }
  }
}
