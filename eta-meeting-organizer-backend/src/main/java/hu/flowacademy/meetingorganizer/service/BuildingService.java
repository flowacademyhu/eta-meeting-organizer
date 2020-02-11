package hu.flowacademy.meetingorganizer.service;

import hu.flowacademy.meetingorganizer.persistance.model.Building;
import hu.flowacademy.meetingorganizer.persistance.repository.BuildingRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional
@AllArgsConstructor
public class BuildingService {

    private BuildingRepository buildingRepository;

    public Building createBuilding(Building building){
        return buildingRepository.save(building);
    }

    public Building updateBuilding(Long id, Building building){
        if(buildingRepository.findById(id).isPresent()){
            Building build = buildingRepository.findById(id).orElseThrow(NoSuchElementException::new);
            build.setId(id);
            return buildingRepository.save(build);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    public void deleteBuilding(Long id){
        buildingRepository.deleteById(id);
    }

    public Building findBuildingById(Long id){
        return buildingRepository.findById(id).get();
    }

    public List<Building> findAllBuilding(){
        return buildingRepository.findAll();
    }
}