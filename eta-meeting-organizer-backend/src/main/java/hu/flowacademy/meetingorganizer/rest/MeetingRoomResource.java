package hu.flowacademy.meetingorganizer.rest;

import hu.flowacademy.meetingorganizer.persistence.model.MeetingRoom;
import hu.flowacademy.meetingorganizer.persistence.model.dto.MeetingRoomDTO;
import hu.flowacademy.meetingorganizer.service.MeetingRoomService;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/meetingrooms")
@AllArgsConstructor
public class MeetingRoomResource {

  private MeetingRoomService meetingRoomService;

  @GetMapping
  public ResponseEntity<List<MeetingRoom>> findAll(
      @RequestParam(defaultValue = "0") Integer pageNumber,
      @RequestParam(defaultValue = "10") Integer pageSize) {
    return new ResponseEntity<>(meetingRoomService.findAll(pageNumber, pageSize), HttpStatus.OK);
  }

  @GetMapping("/{id}")
  public ResponseEntity<MeetingRoom> findOne(@PathVariable Long id) {
    return meetingRoomService.findOne(id).map(ResponseEntity::ok)
        .orElseGet(() -> ResponseEntity.notFound().build());
  }

  @GetMapping("/{buildingId}/buildings")
  public ResponseEntity<List<MeetingRoom>> findByBuildingId(@PathVariable Long buildingId) {
    return new ResponseEntity<>(meetingRoomService.findByBuildingId(buildingId), HttpStatus.OK);
  }

  @PostMapping
  public ResponseEntity<MeetingRoomDTO> createMeetingRoom(@RequestBody MeetingRoom meetingRoom) {
    return new ResponseEntity<>(meetingRoomService.create(meetingRoom),
        HttpStatus.CREATED);
  }

  @PutMapping("/{id}")
  public ResponseEntity<MeetingRoom> updateMeetingRoom(@PathVariable Long id,
      @RequestBody MeetingRoom meetingRoom) {
    meetingRoomService.updateMeetingRoom(id, meetingRoom);
    return ResponseEntity.accepted().build();
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteMeetingRoom(@PathVariable Long id) {
    meetingRoomService.deleteMeetingRoom(id);
    return ResponseEntity.noContent().build();
  }
}
