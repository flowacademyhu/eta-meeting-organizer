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

  public BuildingDTO createBuilding(BuildingDTO buildingDTO) {
    validateBuilding(buildingDTO);
    return new BuildingDTO(buildingRepository.save(buildingDTO.toEntity()));
  }

  public BuildingDTO updateBuilding(Long id, BuildingDTO buildingDTO) {
    validateBuilding(buildingDTO);
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

  public void validateBuilding(BuildingDTO input) {
    if (((buildingRepository.findAllCities()).contains(input.getCity())) &&
        (buildingRepository.findAllBuildingNames().contains(input.getBuildingName()))) {
      throw new BuildingNameAlreadyExistsException(input.getBuildingName());
    }
    if (buildingRepository.findAllAddresses().contains(input.getAddress())) {
      throw new BuildingAddressAlreadyExistsException(input.getAddress());
    }
  }
}
