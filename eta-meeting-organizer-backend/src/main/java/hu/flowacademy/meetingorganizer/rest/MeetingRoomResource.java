package hu.flowacademy.meetingorganizer.rest;

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
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/meetingrooms")
@AllArgsConstructor
public class MeetingRoomResource {

  private MeetingRoomService meetingRoomService;

  @GetMapping
  public ResponseEntity<List<MeetingRoomDTO>> findAll() {
    return new ResponseEntity<>(meetingRoomService.findAll(), HttpStatus.OK);
  }

  @GetMapping("/{id}")
  public ResponseEntity<MeetingRoomDTO> findOne(@PathVariable Long id) {
    return meetingRoomService.findOne(id).map(ResponseEntity::ok)
        .orElseGet(() -> ResponseEntity.notFound().build());
  }

  @GetMapping("/{buildingId}/buildings")
  public ResponseEntity<List<MeetingRoomDTO>> findByBuildingId(@PathVariable Long buildingId) {
    return new ResponseEntity<>(meetingRoomService.findByBuildingId(buildingId), HttpStatus.OK);
  }

  @PostMapping
  public ResponseEntity<MeetingRoomDTO> createMeetingRoom(@RequestBody MeetingRoomDTO meetingRoom) {
    return new ResponseEntity<>(meetingRoomService.create(meetingRoom),
        HttpStatus.CREATED);
  }

  @PutMapping("/{id}")
  public ResponseEntity<MeetingRoomDTO> updateMeetingRoom(@PathVariable Long id,
      @RequestBody MeetingRoomDTO meetingRoom) {
    meetingRoomService.updateMeetingRoom(id, meetingRoom);
    return ResponseEntity.accepted().build();
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteMeetingRoom(@PathVariable Long id) {
    meetingRoomService.deleteMeetingRoom(id);
    return ResponseEntity.noContent().build();
  }
}
