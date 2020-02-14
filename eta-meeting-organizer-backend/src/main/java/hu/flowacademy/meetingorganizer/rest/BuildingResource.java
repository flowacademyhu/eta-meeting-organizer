package hu.flowacademy.meetingorganizer.rest;

import hu.flowacademy.meetingorganizer.persistence.model.*;
import hu.flowacademy.meetingorganizer.service.BuildingService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
@CrossOrigin("http://localhost:4200")
public class BuildingResource {

  private BuildingService buildingService;

  @PostMapping("/buildings")
  public ResponseEntity<?> create(@RequestBody Building building) {
    buildingService.createBuilding(building);
    return new ResponseEntity<>(building, HttpStatus.CREATED);
  }

  @GetMapping("/buildings")
  public ResponseEntity<List<Building>> findAll() {
    List<Building> buildings = buildingService.findAllBuilding();
    return new ResponseEntity<>(buildings, HttpStatus.OK);
  }

  @GetMapping("/buildings/{id}")
  public ResponseEntity<?> findOne(@PathVariable Long id) {
    Building building = buildingService.findBuildingById(id);
    if (building == null) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    } else {
      return new ResponseEntity<>(building, HttpStatus.OK);
    }
  }

  @PutMapping("/buildings/{id}")
  public ResponseEntity<Building> update(@PathVariable Long id, @RequestBody Building building) {
    buildingService.updateBuilding(id, building);
    return ResponseEntity.accepted().build();
  }

  @DeleteMapping("/buildings/{id}")
  public ResponseEntity<Void> delete(@PathVariable Long id) {
    buildingService.deleteBuilding(id);
    return ResponseEntity.noContent().build();
  }
}
