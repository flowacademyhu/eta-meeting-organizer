package hu.flowacademy.meetingorganizer.service;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import hu.flowacademy.meetingorganizer.exception.MeetingRoomNotFoundException;
import hu.flowacademy.meetingorganizer.persistence.model.MeetingRoom;
import hu.flowacademy.meetingorganizer.persistence.model.dto.MeetingRoomDTO;
import hu.flowacademy.meetingorganizer.persistence.repository.MeetingRoomRepository;
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
public class MeetingRoomServiceTest {

  private static MeetingRoom meetingRoom1;
  private static MeetingRoom meetingRoom2;
  private static MeetingRoom meetingRoom;
  private static MeetingRoomDTO meetingRoomDTO1;
  private static MeetingRoomDTO meetingRoomDTO2;

  @Mock
  private MeetingRoomRepository meetingRoomRepository;

  @InjectMocks
  private MeetingRoomService meetingRoomService;

  @BeforeEach
  public void setUp() {
    MockitoAnnotations.initMocks(this);
  }

  @BeforeAll
  public static void init() {
    meetingRoom1 = MeetingRoom.builder().id(1L).name("Kistárgyaló").numberOfSeats(12)
        .projector(true).build();
    meetingRoom2 = MeetingRoom.builder().id(2L).name("Nagytárgyaló").numberOfSeats(40)
        .projector(true).build();
    meetingRoomDTO1 = MeetingRoomDTO.builder().id(1L).name("Kistárgyaló").numberOfSeats(12)
        .projector(true).build();
    meetingRoomDTO2 = MeetingRoomDTO.builder().id(2L).name("Nagytárgyaló").numberOfSeats(40)
        .projector(true).build();
  }

  @Test
  public void findOneTest() {
    when(meetingRoomRepository.findById(1L)).thenReturn(Optional.of(meetingRoom1));
    when(meetingRoomRepository.findById(3L)).thenThrow(new MeetingRoomNotFoundException());
    assertThat(meetingRoomService.findOne(1L), is(Optional.of(meetingRoom1)));
    verify(meetingRoomRepository, times(1)).findById(1L);
  }

  @Test
  public void findAllTest() {
    List<MeetingRoom> expectedMeetingRoom = Arrays.asList(meetingRoom1, meetingRoom2);
    doReturn(expectedMeetingRoom).when(meetingRoomRepository).findAllByOrderById();

    List<MeetingRoomDTO> actualMeetingRoom = meetingRoomService.findAll();
    assertEquals(actualMeetingRoom, expectedMeetingRoom);

  }

  @Test
  public void createTest() {
    meetingRoomService.create(meetingRoomDTO1);
    assertEquals("Kistárgyaló", meetingRoomDTO1.getName());
    assertEquals(true, meetingRoom1.getProjector());
    assertEquals(12, meetingRoomDTO1.getNumberOfSeats());
  }

  /*
 @Test
 public void updateMeetingRoomTest() {
   meetingRoom = MeetingRoom.builder().name("Kistárgyaló").numberOfSeats(20).projector(true)
       .build();
   meetingRoomService.updateMeetingRoom(1L, meetingRoom);
   assertEquals(1L, meetingRoom.getId());
   assertEquals(meetingRoom.getId(), meetingRoom1.getId());
   assertEquals(meetingRoom.getName(), meetingRoom1.getName());
   assertEquals(meetingRoom.getProjector(), meetingRoom1.getProjector());
   assertNotEquals(meetingRoom.getNumberOfSeats(), meetingRoom1.getNumberOfSeats());
 }
*/
  @Test
  public void deleteMeetingRoomTest() {
    meetingRoomService.deleteMeetingRoom(1L);
    verify(meetingRoomRepository, times(1)).deleteById(1L);
  }
}

