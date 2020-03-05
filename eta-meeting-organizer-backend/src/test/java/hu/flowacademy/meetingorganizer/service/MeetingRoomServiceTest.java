package hu.flowacademy.meetingorganizer.service;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import hu.flowacademy.meetingorganizer.persistence.model.MeetingRoom;
import hu.flowacademy.meetingorganizer.persistence.model.dto.BuildingDTO;
import hu.flowacademy.meetingorganizer.persistence.model.dto.MeetingRoomDTO;
import hu.flowacademy.meetingorganizer.persistence.repository.MeetingRoomRepository;
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
public class MeetingRoomServiceTest {

  private static MeetingRoom meetingRoom1;
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
    BuildingDTO building1 = BuildingDTO.builder().buildingName("Fehérház").id(1L).city("Paks")
        .build();
    meetingRoom1 = MeetingRoom.builder().id(1L).name("Kistárgyaló").numberOfSeats(12)
        .projector(true).building(building1.toEntity()).build();
    MeetingRoom meetingRoom2 = MeetingRoom.builder().id(2L).name("Nagytárgyaló").numberOfSeats(40)
        .projector(true).building(building1.toEntity()).build();
    meetingRoomDTO1 = MeetingRoomDTO.builder().id(1L).name("Kistárgyaló").numberOfSeats(12)
        .projector(true).building(building1).build();
    meetingRoomDTO2 = MeetingRoomDTO.builder().id(2L).name("Nagytárgyaló").numberOfSeats(40)
        .projector(true).building(building1).build();
  }

  @Test
  public void findOneTest() {
    when(meetingRoomRepository.findById(1L)).thenReturn(Optional.of(meetingRoom1));
    assertThat(meetingRoomService.findOne(1L), is(Optional.of(meetingRoomDTO1)));
    verify(meetingRoomRepository, times(1)).findById(1L);
  }

  @Test
  public void findAllTest() {
    List<MeetingRoom> expectedMeetingRoom = Arrays
        .asList(meetingRoomDTO1.toEntity(), meetingRoomDTO2.toEntity());
    doReturn(expectedMeetingRoom).when(meetingRoomRepository).findAllByOrderById();

    List<MeetingRoomDTO> actualMeetingRoom = meetingRoomService.findAll();
    assert (actualMeetingRoom.contains(meetingRoomDTO1));

  }

  @Test
  public void createTest() {
    when(meetingRoomRepository.save(meetingRoomDTO1.toEntity())).thenReturn(meetingRoom1);
    assertThat(meetingRoomService.create(meetingRoomDTO1), is(meetingRoomDTO1));
    verify(meetingRoomRepository, times(1)).save(meetingRoomDTO1.toEntity());
  }

  @Test
  public void updateMeetingRoomTest() {
    when(meetingRoomRepository.findById(1L)).thenReturn(Optional.of(meetingRoom1));
    MeetingRoom meetingRoom = meetingRoomDTO1.toEntity();
    meetingRoom.setId(1L);
    when(meetingRoomRepository.save(meetingRoom)).thenReturn(meetingRoom);

    meetingRoomService.updateMeetingRoom(1L, meetingRoomDTO1);

    assertEquals(1L, meetingRoomDTO1.getId());
    assertEquals("Kistárgyaló", meetingRoomDTO1.getName());
    assertEquals(12, meetingRoomDTO1.getNumberOfSeats());
    assertEquals(true, meetingRoomDTO1.getProjector());

  }

  @Test
  public void deleteMeetingRoomTest() {
    meetingRoomService.deleteMeetingRoom(1L);
    verify(meetingRoomRepository, times(1)).deleteById(1L);
  }

  @Test
  public void findByBuildingIdTest() {
    when(meetingRoomRepository.findByBuilding_Id(1L))
        .thenReturn(List.of(meetingRoomDTO1.toEntity()));
    assertThat(meetingRoomService.findByBuildingId(1L), is(List.of(meetingRoomDTO1)));
    verify(meetingRoomRepository, times(1)).findByBuilding_Id(1L);
  }

  @Test
  public void deleteAllByIdTest() {
    List<Long> idList = new ArrayList<>();
    idList.add(1L);
    idList.add(2L);

    meetingRoomService.deleteAllById(idList);
    verify(meetingRoomRepository, times(1)).deleteByIdIn(idList);
  }
}
