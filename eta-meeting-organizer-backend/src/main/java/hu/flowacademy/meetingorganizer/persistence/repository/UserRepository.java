package hu.flowacademy.meetingorganizer.persistence.repository;

import hu.flowacademy.meetingorganizer.persistence.model.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User, Long> {

}

