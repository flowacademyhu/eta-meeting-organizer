package hu.flowacademy.meetingorganizer.rest;

import hu.flowacademy.meetingorganizer.persistence.model.UserPrincipal;
import hu.flowacademy.meetingorganizer.service.UserService;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserResource {

  @Autowired
  private UserService userService;

  @GetMapping
  public ResponseEntity<List<UserPrincipal>> findAll() {
    List<UserPrincipal> userPrincipals = userService.findAll();
    return new ResponseEntity<>(userPrincipals, HttpStatus.OK);
  }

  @GetMapping("/{id}")
  public ResponseEntity<UserPrincipal> getOne(@PathVariable String id) {
    Optional<UserPrincipal> userOptional = userService.findOne(id);
    return userOptional.isPresent() ? ResponseEntity.ok(userOptional.get())
        : ResponseEntity.notFound().build();
  }

  @PostMapping
  public ResponseEntity<UserPrincipal> createUser(@RequestBody UserPrincipal userPrincipal) {
    return new ResponseEntity<>(userService.createUser(userPrincipal), HttpStatus.CREATED);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteUser(@PathVariable String id) {
    userService.deleteUser(id);
    return ResponseEntity.noContent().build();
  }

  @PutMapping("/{id}")
  public ResponseEntity<UserPrincipal> updateUser(@PathVariable String id, @RequestBody UserPrincipal userPrincipal) {
    userService.updateUser(id, userPrincipal);
    return ResponseEntity.accepted().build();
  }
}
