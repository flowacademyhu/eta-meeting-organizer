package hu.flowacademy.meetingorganizer.rest;

import hu.flowacademy.meetingorganizer.persistence.model.MeetingRoom;
import hu.flowacademy.meetingorganizer.service.MeetingRoomService;
import java.util.Optional;
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

import java.util.List;

@RestController
@RequestMapping("/api/meetingrooms")
@AllArgsConstructor
public class MeetingRoomResource {

  private MeetingRoomService meetingRoomService;

  @GetMapping
  public ResponseEntity<List<MeetingRoom>> findAll() {
    List<MeetingRoom> meetingRooms = meetingRoomService.findAll();
    return new ResponseEntity<>(meetingRooms, HttpStatus.OK);
  }

  @GetMapping("{id}")
  public ResponseEntity<MeetingRoom> findOne(@PathVariable Long id) {
    Optional<MeetingRoom> meetingRoomOptional = meetingRoomService.findOne(id);
    return meetingRoomOptional.isEmpty() ? ResponseEntity.notFound().build()
        : ResponseEntity.ok(meetingRoomOptional.get());
  }

  @PostMapping
  public ResponseEntity<MeetingRoom> createMeetingRoom(@RequestBody MeetingRoom meetingRoom) {
    meetingRoomService.createMeetingRoom(meetingRoom);
    return new ResponseEntity<>(meetingRoom, HttpStatus.CREATED);
  }

  @PutMapping("{id}")
  public ResponseEntity<MeetingRoom> updateMeetingRoom(@PathVariable Long id,
      @RequestBody MeetingRoom meetingRoom) {
    meetingRoomService.updateMeetingRoom(id, meetingRoom);
    return ResponseEntity.accepted().build();
  }

  @DeleteMapping("{id}")
  public ResponseEntity<Void> deleteMeetingRoom(@PathVariable Long id) {
    meetingRoomService.deleteMeetingRoom(id);
    return ResponseEntity.noContent().build();
  }
}