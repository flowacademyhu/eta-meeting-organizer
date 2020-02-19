package hu.flowacademy.meetingorganizer.service;

import hu.flowacademy.meetingorganizer.persistence.model.Building;
import hu.flowacademy.meetingorganizer.persistence.repository.BuildingRepository;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class BuildingService {

  private BuildingRepository buildingRepository;

  public Building createBuilding(Building building) {
    return buildingRepository.save(building);
  }

  public Building updateBuilding(Long id, Building building) {
    building.setId(id);
    return buildingRepository.save(building);
  }

  public void deleteBuilding(Long id) {
    buildingRepository.deleteById(id);
  }

  public Optional<Building> findOne(Long id) {
    return buildingRepository.findById(id);
  }

  public List<Building> findAll(Integer pageNumber, Integer pageSize) {
    return buildingRepository.findAll(PageRequest.of(pageNumber, pageSize)).getContent();
  }

  public List<String> findAllCities() {
    return buildingRepository.findAllCities();
  }

  public List<Building> findByCity(String city) {
    return buildingRepository.findByCity(city);
  }
}
