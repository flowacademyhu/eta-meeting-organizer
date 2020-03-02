package hu.flowacademy.meetingorganizer.rest;

import hu.flowacademy.meetingorganizer.persistence.model.Building;
import hu.flowacademy.meetingorganizer.service.BuildingService;
import java.util.ArrayList;
import java.util.Arrays;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/buildings")
@AllArgsConstructor
public class BuildingResource {

  private BuildingService buildingService;

  @PostMapping
  public ResponseEntity<Building> createBuilding(@RequestBody Building building) {
    return new ResponseEntity<>(buildingService.createBuilding(building), HttpStatus.CREATED);
  }

  @GetMapping
  public ResponseEntity<List<Building>> findAll() {
    return new ResponseEntity<>(buildingService.findAll(), HttpStatus.OK);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Building> findOne(@PathVariable Long id) {
    return buildingService.findOne(id).map(ResponseEntity::ok)
        .orElseGet(() -> ResponseEntity.notFound().build());
  }

  @GetMapping("/cities/names")
  public ResponseEntity<List<String>> findAllCities() {
    return new ResponseEntity<>(buildingService.findAllCities(), HttpStatus.OK);
  }

  @GetMapping("/cities")
  public ResponseEntity<List<Building>> findByCity(@RequestParam String city) {
    return new ResponseEntity<>(buildingService.findByCity(city), HttpStatus.OK);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Building> updateBuilding(@PathVariable Long id,
      @RequestBody Building building) {
    buildingService.updateBuilding(id, building);
    return ResponseEntity.accepted().build();
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteBuilding(@PathVariable Long id) {
    buildingService.deleteBuilding(id);
    return ResponseEntity.noContent().build();
  }

  @PostMapping("/groupdelete")
  public ResponseEntity<?> deleteWithCheckbox(@RequestBody List<Building> id) {
    buildingService.deleteBuildingByCheckBox(id);
    return ResponseEntity.noContent().build();
  }
}
