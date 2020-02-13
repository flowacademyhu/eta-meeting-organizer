package hu.flowacademy.meetingorganizer.persistence.repository;

<<<<<<< HEAD
=======
import hu.flowacademy.meetingorganizer.persistence.model.User;
>>>>>>> cbb21c0de3694b7792b28a867a2ed2136d07dcd0
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

}

