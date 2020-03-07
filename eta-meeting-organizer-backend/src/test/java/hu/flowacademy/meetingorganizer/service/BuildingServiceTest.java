package hu.flowacademy.meetingorganizer.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import hu.flowacademy.meetingorganizer.persistence.model.Building;
import hu.flowacademy.meetingorganizer.persistence.model.dto.BuildingDTO;
import hu.flowacademy.meetingorganizer.persistence.repository.BuildingRepository;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class BuildingServiceTest {
    private static final Building BUILDING_1 = Building.builder().id(1L).city("Budapest").address("Kossuth tér 1.").buildingName("Kék épület").build();
    private static final Building BUILDING_2 = Building.builder().id(2L).city("Szeged").address("Damjanich u. 10.").buildingName("Zöld épület").build();
    private static final BuildingDTO BUILDING_DTO_1 = BuildingDTO.builder().id(1L).city("Budapest").address("Kossuth tér 1.").buildingName("Kék épület").build();

    @Mock
    private BuildingRepository buildingRepository;

    @InjectMocks
    private BuildingService buildingService;

    @Test
    public void findOneTest() {
        when(buildingRepository.findById(1L)).thenReturn(Optional.of(BUILDING_1));

        Optional<Building> buildingOptional = buildingService.findOne(1L);

        verify(buildingRepository).findById(1L);
        assertEquals(Optional.of(BUILDING_1), buildingOptional);
    }

    @Test
    public void findAllTest() {
        List<Building> expectedUsers = Arrays.asList(BUILDING_1, BUILDING_2);
        when(buildingRepository.findAllByOrderById()).thenReturn(expectedUsers);

        List<Building> actualUsers = buildingService.findAll();

        assertEquals(actualUsers, expectedUsers);
    }

    @Test
    public void createBuildingTest() {
        when(buildingRepository.save(BUILDING_DTO_1.toEntity())).thenReturn(BUILDING_1);

        BuildingDTO building = buildingService.createBuilding(BUILDING_DTO_1);

        verify(buildingRepository).save(eq(BUILDING_DTO_1.toEntity()));
        assertEquals(BUILDING_DTO_1, building);
    }

    @Test
    public void updateBuildingTest() {
        when(buildingRepository.findById(1L)).thenReturn(Optional.of(BUILDING_1));
        when(buildingRepository.findByAddressNotIn(BUILDING_1.getAddress())).thenReturn(List.of());
        when(buildingRepository
                .findBuildingNamesByCity(BUILDING_DTO_1.getCity(), BUILDING_1.getBuildingName()))
                .thenReturn(List.of());
        Building building = BUILDING_DTO_1.toEntity();
        building.setId(1L);
        when(buildingRepository.save(building)).thenReturn(building);

        buildingService.updateBuilding(1L, BUILDING_DTO_1);

        assertEquals(1L, BUILDING_DTO_1.getId());
        assertEquals("Kék épület", BUILDING_DTO_1.getBuildingName());
        assertEquals("Budapest", BUILDING_DTO_1.getCity());
        assertEquals("Kossuth tér 1.", BUILDING_DTO_1.getAddress());
    }

    @Test
    public void deleteBuildingTest() {
        buildingService.deleteBuilding(1L);
        verify(buildingRepository).deleteById(1L);
    }

    @Test
    public void findAllCitiesTest() {
        List<String> cities = List.of("Budapest", "Szeged");
        when(buildingRepository.findAllCities()).thenReturn(cities);

        List<String> citiesActual = buildingService.findAllCities();

        verify(buildingRepository).findAllCities();
        assertEquals(cities, citiesActual);
    }

    @Test
    public void findAllByCityTest() {
        when(buildingRepository.findAllByCity("Budapest")).thenReturn(List.of(BUILDING_1));

        List<Building> cityActual = buildingService.findAllByCity("Budapest");

        verify(buildingRepository).findAllByCity("Budapest");
        assertEquals(List.of(BUILDING_1), cityActual);
    }

    @Test
    public void deleteAllByIdTest() {
        buildingService.deleteAllById(List.of(1L, 2L));
        verify(buildingRepository).deleteByIdIn(List.of(1L, 2L));
    }
}
