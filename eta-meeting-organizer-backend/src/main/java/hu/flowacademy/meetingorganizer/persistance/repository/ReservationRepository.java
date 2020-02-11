package hu.flowacademy.meetingorganizer.persistance.repository;

import hu.flowacademy.meetingorganizer.persistance.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
}
