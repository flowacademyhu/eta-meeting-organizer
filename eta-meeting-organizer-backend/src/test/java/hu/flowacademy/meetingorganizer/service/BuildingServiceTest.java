package hu.flowacademy.meetingorganizer.service;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import hu.flowacademy.meetingorganizer.persistence.model.Building;
import hu.flowacademy.meetingorganizer.persistence.model.dto.BuildingDTO;
import hu.flowacademy.meetingorganizer.persistence.repository.BuildingRepository;
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
  private static Building building;
  private static BuildingDTO buildingDTO1;
  private static BuildingDTO buildingDTO2;
  private static BuildingDTO buildingDTO;

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
    building1 = Building.builder().id(1L).city("Budapest").address("Kossuth tér 1.").buildingName("Kék épület").build();
    building2 = Building.builder().id(2L).city("Szeged").address("Damjanich u. 10.").buildingName("Zöld épület").build();
    buildingDTO1 = BuildingDTO.builder().id(1L).city("Budapest").address("Kossuth tér 1.").buildingName("Kék épület").build();
    buildingDTO2 = BuildingDTO.builder().id(2L).city("Szeged").address("Damjanich u. 10.").buildingName("Zöld épület").build();
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
    buildingService.createBuilding(buildingDTO1);
    assertEquals("Budapest", building1.getCity());
    assertEquals("Kossuth tér 1.", building1.getAddress());
  }

  @Test
  public void updateBuildingTest() {
    building = Building.builder().city("Budapest").address("Kossuth tér 2.").build();
    buildingService.updateBuilding(1L, buildingDTO);
    assertEquals(1L, building.getId());
    assertEquals(building.getId(), building1.getId());
    assertEquals(building.getCity(), building1.getCity());
    assertNotEquals(building.getAddress(), building1.getAddress());
  }

  @Test
  public void deleteBuildingTest() {
    buildingService.deleteBuilding(1L);
    verify(buildingRepository, times(1)).deleteById(1L);
  }

  @Test
  public void findAllCitiesTest() {

  }

  @Test
  public void findByCityTest() {

  }
}
