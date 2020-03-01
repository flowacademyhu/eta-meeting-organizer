package hu.flowacademy.meetingorganizer.persistence.repository;

import hu.flowacademy.meetingorganizer.persistence.model.Building;
import java.util.List;
import java.util.Set;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BuildingRepository extends JpaRepository<Building, Long> {

  @Query("select distinct city from Building b")
  List<String> findAllCities();

  @Query("select distinct address from Building b")
  List<String> findAllAddresses();

  @Query("select distinct buildingName from Building b")
  List<String> findAllBuildingNames();

  List<Building> findByCityAndBuildingName(String city, String buildingName);

  List<Building> findAllByCity(String city);

  List<Building> findAllByOrderById();

  List<Building> findAllByAddress(String address);
}
