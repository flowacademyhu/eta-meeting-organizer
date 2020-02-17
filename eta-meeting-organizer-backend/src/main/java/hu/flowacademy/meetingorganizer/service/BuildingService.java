package hu.flowacademy.meetingorganizer.service;

import hu.flowacademy.meetingorganizer.persistence.model.Building;
import hu.flowacademy.meetingorganizer.persistence.repository.BuildingRepository;
import java.util.ArrayList;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
    Pageable pageable = PageRequest.of(pageNumber, pageSize);
    Page<Building> pagedResult = buildingRepository.findAll(pageable);
    return pagedResult.hasContent() ? pagedResult.getContent() : new ArrayList<Building>();
  }
}
