package hu.flowacademy.meetingorganizer.service;

import hu.flowacademy.meetingorganizer.persistence.model.User;
import hu.flowacademy.meetingorganizer.persistence.repository.UserRepository;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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
    Page<User> pagedResult = userRepository.findAll(PageRequest.of(pageNumber, pageSize));
    return pagedResult.getContent();
  }

  public Optional<User> findOne(Long id) {
    return userRepository.findById(id);
  }

  public User createUser(User user) {
    return userRepository.save(user);
  }

  public void deleteUser(Long id) {
    userRepository.deleteById(id);
  }

  public User updateUser(Long id, User user) {
    user.setId(id);
    return userRepository.save(user);
  }
}
