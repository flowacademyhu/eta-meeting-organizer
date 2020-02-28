package hu.flowacademy.meetingorganizer.service;

import hu.flowacademy.meetingorganizer.exception.BuildingAddressAlreadyExistsException;
import hu.flowacademy.meetingorganizer.exception.BuildingNameAlreadyExistsException;
import hu.flowacademy.meetingorganizer.exception.BuildingNotFoundException;
import hu.flowacademy.meetingorganizer.persistence.model.Building;
import hu.flowacademy.meetingorganizer.persistence.model.dto.BuildingDTO;
import hu.flowacademy.meetingorganizer.persistence.repository.BuildingRepository;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class BuildingService {

  private BuildingRepository buildingRepository;

  public Building createBuilding(Building building) {
    if ((buildingRepository.findByBuildingName(building.getBuildingName())).isPresent() &&
        (buildingRepository.findByCity(building.getCity())).isPresent())
    {
      throw new BuildingNameAlreadyExistsException(building.getBuildingName());
    }
    return buildingRepository.save(building);
  }

  public Building updateBuilding(Long id, Building building) {
    building = buildingRepository.findById(id).orElseThrow(() -> new BuildingNotFoundException(id));
    building.setId(id);
    return buildingRepository.save(building);
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

  public void validateBuildingName(Long id, BuildingDTO input) {
    if ((buildingRepository.findByBuildingName(input.getBuildingName())).isPresent() &&
        (buildingRepository.findByCity(input.getCity())).isPresent())
    {
      throw new BuildingNameAlreadyExistsException(input.getBuildingName());
    }
  }

  public void validateBuildingAddress(Long id, BuildingDTO input) {
    if ((buildingRepository.findByAddress(input.getAddress())).isPresent()) {
      throw new BuildingAddressAlreadyExistsException(input.getAddress());
    }
  }
}
