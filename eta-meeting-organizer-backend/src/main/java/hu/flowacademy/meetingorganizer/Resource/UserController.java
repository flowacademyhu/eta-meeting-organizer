package hu.flowacademy.meetingorganizer.Resource;


import hu.flowacademy.meetingorganizer.persistence.model.User;
import hu.flowacademy.meetingorganizer.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;




    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> userList = userService.findAllUser();
        return new ResponseEntity<List<User>>(userList, new HttpHeaders(), HttpStatus.OK);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") Long id) {
        User userEntity = userService.findUserById(id);
        return new ResponseEntity<User>(userEntity, new HttpHeaders(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<User> createUser(User user) {
        User updatedUser = userService.createUser(user);
        return new ResponseEntity<User>(updatedUser, new HttpHeaders(), HttpStatus.OK);
    }

    @DeleteMapping("/users/{id}")
    public HttpStatus deleteUser(@PathVariable("id") Long id) {
        userService.deleteUser(id);
        return HttpStatus.OK;
    }



}
