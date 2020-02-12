package hu.flowacademy.meetingorganizer.service;
import hu.flowacademy.meetingorganizer.persistence.model.User;
import hu.flowacademy.meetingorganizer.persistence.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> findAllUser(){
        List<User> userList = userRepository.findAll();
            return new ArrayList<User>();
    }

    public User findUserById(Long id) throws ResponseStatusException{
       return userRepository.findById(id)
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.BAD_REQUEST));
    }

    public User createUser(User user){
        return userRepository.save(user);
    }

    public void deleteUser(Long id) throws ResponseStatusException{
            userRepository.deleteById(id);
    }

}
