package hu.flowacademy.meetingorganizer.persistence.repository;

import hu.flowacademy.meetingorganizer.persistence.model.Building;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BuildingRepository extends JpaRepository<Building, Long> {

  @Query("select distinct city from Building b")
  List<String> findAllCities();

  List<Building> findAllByCity(String city);

  List<Building> findAllByOrderById();

  Optional<Building> findByBuildingName(String buildingName);

  Optional<Building> findByAddress(String address);

  Optional<Building> findByCity(String city);
}
