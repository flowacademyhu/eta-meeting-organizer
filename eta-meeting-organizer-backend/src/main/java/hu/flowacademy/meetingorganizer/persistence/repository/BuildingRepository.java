package hu.flowacademy.meetingorganizer.persistence.repository;

import hu.flowacademy.meetingorganizer.persistence.model.Building;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BuildingRepository extends JpaRepository<Building, Long> {

  @Query("SELECT DISTINCT city FROM Building b")
  List<String> findAllCities();

  @Query("SELECT DISTINCT address FROM Building b")
  List<String> findAllAddresses();

  @Query("SELECT address FROM Building b WHERE b.address != ?1")
  List<String> findByAddressNotIn(String address);

  List<Building> findByCityAndBuildingName(String city, String buildingName);

  @Query("SELECT buildingName FROM Building b WHERE b.city = ?1 AND b.buildingName != ?2")
  List<String> findBuildingNamesByCity(String city, String buildingName);

  List<Building> findAllByCity(String city);

  List<Building> findAllByOrderById();

  @Modifying
  void deleteByIdIn(List<Long> id);
}
