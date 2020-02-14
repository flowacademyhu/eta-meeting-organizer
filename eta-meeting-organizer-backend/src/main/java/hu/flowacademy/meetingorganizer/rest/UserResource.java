package hu.flowacademy.meetingorganizer.rest;

import hu.flowacademy.meetingorganizer.persistence.model.User;
import hu.flowacademy.meetingorganizer.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
@CrossOrigin("http://localhost:4200")
public class UserResource {

  private UserService userService;

  @GetMapping("/users")
  public ResponseEntity<List<User>> getAllUsers() {
    List<User> userList = userService.findAllUser();
    return new ResponseEntity<List<User>>(userList, HttpStatus.OK);
  }

  @GetMapping("/users/{id}")
  public ResponseEntity<User> getUserById(@PathVariable("id") Long id) {
    User userEntity = userService.findUserById(id);
    return new ResponseEntity<User>(userEntity, HttpStatus.OK);
  }

  @PostMapping
  public ResponseEntity<User> createUser(User user) {
    User updatedUser = userService.createUser(user);
    return new ResponseEntity<User>(updatedUser, HttpStatus.CREATED);
  }

  @DeleteMapping("/users/{id}")
  public ResponseEntity<?> deleteUser(@PathVariable("id") Long id) {
    userService.deleteUser(id);
    return ResponseEntity.noContent().build();
  }
}
