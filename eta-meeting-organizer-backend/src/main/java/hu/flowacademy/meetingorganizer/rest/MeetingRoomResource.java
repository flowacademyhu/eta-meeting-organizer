package hu.flowacademy.meetingorganizer.rest;

import hu.flowacademy.meetingorganizer.persistence.model.MeetingRoom;
import hu.flowacademy.meetingorganizer.service.MeetingRoomService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class MeetingRoomResource {

    private MeetingRoomService meetingRoomService;

    @GetMapping("/meetingrooms")
    public ResponseEntity<List<MeetingRoom>> findAllMeetingRooms() {
        List<MeetingRoom> meetingRooms = meetingRoomService.findAllMeetingRooms();
        return new ResponseEntity<>(meetingRooms, HttpStatus.OK);
    }

    @GetMapping("/meetingrooms/{id}")
    public ResponseEntity<?> findOne(@PathVariable Long id) {
        MeetingRoom meetingRoom = meetingRoomService.findOneMeetingRoomById(id);
        if(meetingRoom == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(meetingRoom, HttpStatus.OK);
        }
    }

    @PostMapping("/meetingrooms")
    public ResponseEntity<MeetingRoom> createMeetingRoom(@RequestBody MeetingRoom meetingRoom) {
        meetingRoomService.createMeetingRoom(meetingRoom);
        return new ResponseEntity<>(meetingRoom, HttpStatus.CREATED);
    }

    @PutMapping("meetingrooms/{id}")
    public ResponseEntity<MeetingRoom> updateMeetingRoom(@PathVariable Long id, @RequestBody MeetingRoom meetingRoom) {
        meetingRoomService.updateMeetingRoom(id, meetingRoom);
        return ResponseEntity.accepted().build();
    }

    @DeleteMapping("meetingrooms/{id}")
    public ResponseEntity<Void> deleteMeetingRoom(@PathVariable Long id) {
        meetingRoomService.deleteMeetingRoom(id);
        return ResponseEntity.noContent().build();
    }
}
