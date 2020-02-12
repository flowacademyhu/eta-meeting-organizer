package hu.flowacademy.meetingorganizer.persistance.repository;


import hu.flowacademy.meetingorganizer.persistance.model.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

}

