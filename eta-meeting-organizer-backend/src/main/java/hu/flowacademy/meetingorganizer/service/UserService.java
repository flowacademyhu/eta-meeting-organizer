package hu.flowacademy.meetingorganizer.service;

import hu.flowacademy.meetingorganizer.persistence.model.Role;
import hu.flowacademy.meetingorganizer.persistence.model.User;
import hu.flowacademy.meetingorganizer.persistence.model.dto.RoleDTO;
import hu.flowacademy.meetingorganizer.persistence.repository.UserRepository;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
@Transactional
public class UserService {

  @Autowired
  private UserRepository userRepository;

  public List<User> findAll(Integer pageNumber, Integer pageSize) {
    return userRepository.findAll(PageRequest.of(pageNumber, pageSize)).getContent();
  }

  public Optional<User> findOne(String id) {
    return userRepository.findById(id);
  }

  public User createUser(User user) {
    return userRepository.save(user);
  }

  public void deleteUser(String id) {
    userRepository.deleteById(id);
  }

  public User updateUser(String id, User user) {
    user.setId(id);
    return userRepository.save(user);
  }

  public User setUserRole(String id, RoleDTO roleDTO) {
    User user = userRepository.findById(id).orElseThrow();
    user.setRole(roleDTO.getRole());
    return userRepository.save(user);
  }
}
