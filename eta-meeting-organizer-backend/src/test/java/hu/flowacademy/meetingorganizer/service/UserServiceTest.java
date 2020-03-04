package hu.flowacademy.meetingorganizer.service;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import hu.flowacademy.meetingorganizer.persistence.model.Role;
import hu.flowacademy.meetingorganizer.persistence.model.User;
import hu.flowacademy.meetingorganizer.persistence.model.dto.RoleDTO;
import hu.flowacademy.meetingorganizer.persistence.repository.UserRepository;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
public class UserServiceTest {

  private static User user1;
  private static User user2;

  @Mock
  private UserRepository userRepository;

  @InjectMocks
  private UserService userService;

  @BeforeEach
  public void setUp() {
    MockitoAnnotations.initMocks(this);
  }

  @BeforeAll
  public static void init() {
    user1 = User.builder().id("12345rtz").username("gyula@gmail.com").password("alma")
        .role(Role.ADMIN).accountNonExpired(true)
        .accountNonLocked(true)
        .enabled(true)
        .build();
    user2 = User.builder().id("2rtifnjw234").username("kazmer@gmail.com").password("barack")
        .role(Role.USER).accountNonExpired(true)
        .accountNonLocked(true)
        .enabled(true)
        .build();
  }

  @Test
  public void findOneTest() {
    when(userRepository.findById("12345rtz")).thenReturn(Optional.of(user1));
    assertThat(userService.findOne("12345rtz"), is(Optional.of(user1)));
    verify(userRepository, times(1)).findById("12345rtz");

  }

  @Test
  public void findAllTest() {
    List<User> expectedUsers = Arrays.asList(user1, user2);
    doReturn(expectedUsers).when(userRepository).findAllByOrderById();

    List<User> actualUsers = userService.findAll();
    assertEquals(actualUsers, expectedUsers);
  }

  @Test
  public void createUserTest() {
    userService.createUser(user1);
    assertEquals("gyula@gmail.com", user1.getUsername());
    assertEquals(Role.ADMIN, user1.getRole());
  }

  @Test
  public void setUserRoleTest() {
    RoleDTO roleDTO = RoleDTO.builder().role(Role.USER).build();
    when(userRepository.findById("12345rtz")).thenReturn(Optional.of(user1));
    assertThat(userService.findOne("12345rtz"), is(Optional.of(user1)));
    verify(userRepository, times(1)).findById("12345rtz");

    userRepository.save(user1);
    userService.setUserRole(user1.getId(), roleDTO);
    assertEquals("12345rtz", user1.getId());
    assertEquals(Role.USER, user1.getRole());

  }

  @Test
  public void updateUserTest() {
    User user = User.builder().username("gyula@gmail.com").password("rántotta").role(Role.READER)
        .accountNonExpired(true)
        .accountNonLocked(true)
        .enabled(true)
        .build();
    userService.updateUser("12345rtz", user);
    when(userRepository.findById("12345rtz")).thenReturn(Optional.of(user));
    assertThat(userService.findOne("12345rtz"), is(Optional.of(user)));
    verify(userRepository, times(1)).findById("12345rtz");
  }

  @Test
  public void deleteUserTest() {
    userService.deleteUser("12345rtz");
    verify(userRepository, times(1)).deleteById("12345rtz");
  }

  @Test
  public void deleteAllByIdTest() {
    List<String> idList = new ArrayList<>();
    idList.add("12345rtz");
    idList.add("2rtifnjw234");

    userService.deleteAllById(idList);
    verify(userRepository, times(1)).deleteByIdIn(idList);
  }
}
