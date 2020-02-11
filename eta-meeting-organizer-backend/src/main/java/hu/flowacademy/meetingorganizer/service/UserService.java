package hu.flowacademy.meetingorganizer.service;


import hu.flowacademy.meetingorganizer.persistence.model.User;
import hu.flowacademy.meetingorganizer.persistence.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;




    public User saveUser(User user){
        return userRepository.save(user);
    }


    public User findById(Long id) {
        User user = this.userRepository.findById(id)
                .orElseThrow(
                        () -> new ResponseStatusException(HttpStatus.BAD_REQUEST));
        return user;
    }

    public List<User> findAll() {

        List<User> users = (List<User>) userRepository.findAll();

        return users;
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

}
