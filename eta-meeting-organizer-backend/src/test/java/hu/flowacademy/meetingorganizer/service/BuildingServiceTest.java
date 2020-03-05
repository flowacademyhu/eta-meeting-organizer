package hu.flowacademy.meetingorganizer.service;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import hu.flowacademy.meetingorganizer.persistence.model.Building;
import hu.flowacademy.meetingorganizer.persistence.model.MeetingRoom;
import hu.flowacademy.meetingorganizer.persistence.model.dto.BuildingDTO;
import hu.flowacademy.meetingorganizer.persistence.repository.BuildingRepository;
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
public class BuildingServiceTest {

  private static Building building1;
  private static Building building2;
  private static BuildingDTO buildingDTO1;
  private static List<MeetingRoom> meetingRooms = new ArrayList<>();

  @Mock
  private BuildingRepository buildingRepository;

  @InjectMocks
  private BuildingService buildingService;

  @BeforeEach
  public void setUp() {
    MockitoAnnotations.initMocks(this);
  }

  @BeforeAll
  public static void init() {
    MeetingRoom meetingRoom1 = MeetingRoom.builder().id(1L).name("Ügyfél fogadó").numberOfSeats(5)
        .building(building1).projector(false).build();
    building1 = Building.builder().id(1L).city("Budapest").address("Kossuth tér 1.")
        .buildingName("Kék épület").build();
    building2 = Building.builder().id(2L).city("Szeged").address("Damjanich u. 10.")
        .buildingName("Zöld épület").build();
    buildingDTO1 = BuildingDTO.builder().id(1L).city("Budapest").address("Kossuth tér 1.")
        .buildingName("Kék épület").build();
    BuildingDTO buildingDTO2 = BuildingDTO.builder().id(2L).city("Szeged")
        .address("Damjanich u. 10.")
        .buildingName("Zöld épület").build();
  }

  @Test
  public void findOneTest() {
    when(buildingRepository.findById(1L)).thenReturn(Optional.of(building1));
    assertThat(buildingService.findOne(1L), is(Optional.of(building1)));
    verify(buildingRepository, times(1)).findById(1L);

  }

  @Test
  public void findAllTest() {
    List<Building> expectedUsers = Arrays.asList(building1, building2);
    doReturn(expectedUsers).when(buildingRepository).findAllByOrderById();

    List<Building> actualUsers = buildingService.findAll();
    assertEquals(actualUsers, expectedUsers);

  }

  @Test
  public void createBuildingTest() {
    when(buildingRepository.save(buildingDTO1.toEntity())).thenReturn(building1);
    assertThat(buildingService.createBuilding(buildingDTO1), is(buildingDTO1));
    verify(buildingRepository, times(1)).save(buildingDTO1.toEntity());
  }

  @Test
  public void updateBuildingTest() {
    when(buildingRepository.findById(1L)).thenReturn(Optional.of(building1));
    when(buildingRepository.findByAddressNotIn(building1.getAddress())).thenReturn(List.of());
    when(buildingRepository
        .findBuildingNamesByCity(buildingDTO1.getCity(), building1.getBuildingName()))
        .thenReturn(List.of());
    Building building = buildingDTO1.toEntity();
    building.setId(1L);
    when(buildingRepository.save(building)).thenReturn(building);

    buildingService.updateBuilding(1L, buildingDTO1);

    assertEquals(1L, buildingDTO1.getId());
    assertEquals("Kék épület", buildingDTO1.getBuildingName());
    assertEquals("Budapest", buildingDTO1.getCity());
    assertEquals("Kossuth tér 1.", buildingDTO1.getAddress());
  }

  @Test
  public void deleteBuildingTest() {
    buildingService.deleteBuilding(1L);
    verify(buildingRepository, times(1)).deleteById(1L);
  }

  @Test
  public void findAllCitiesTest() {
    when(buildingRepository.findAllCities()).thenReturn(List.of("Budapest", "Szeged"));
    assertThat(buildingService.findAllCities(), is(List.of("Budapest", "Szeged")));
    verify(buildingRepository, times(1)).findAllCities();
  }

  @Test
  public void findAllByCityTest() {
    when(buildingRepository.findAllByCity("Budapest")).thenReturn(List.of(building1));
    assertThat(buildingService.findAllByCity("Budapest"), is(List.of(building1)));
    verify(buildingRepository, times(1)).findAllByCity("Budapest");
  }

  @Test
  public void deleteAllByIdTest() {
    buildingService.deleteAllById(List.of(1L, 2L));
    verify(buildingRepository, times(1)).deleteByIdIn(List.of(1L, 2L));
  }
}
