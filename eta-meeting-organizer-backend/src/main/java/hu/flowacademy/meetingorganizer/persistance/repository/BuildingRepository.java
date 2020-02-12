package hu.flowacademy.meetingorganizer.persistance.repository;

import hu.flowacademy.meetingorganizer.persistance.model.Building;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BuildingRepository extends JpaRepository<Building, Long> {

}
