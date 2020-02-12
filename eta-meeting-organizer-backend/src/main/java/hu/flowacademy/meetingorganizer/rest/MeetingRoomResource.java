package hu.flowacademy.meetingorganizer.rest;

import hu.flowacademy.meetingorganizer.persistance.model.MeetingRoom;
import hu.flowacademy.meetingorganizer.service.MeetingRoomService;
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
    public ResponseEntity<List<MeetingRoom>> findAllMeetingRooms() {
        List<MeetingRoom> meetingRooms = meetingRoomService.findAllMeetingRooms();
        return new ResponseEntity<>(meetingRooms, HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<MeetingRoom> findOne(@PathVariable Long id) {
        MeetingRoom meetingRoom = meetingRoomService.findOneMeetingRoomById(id);
        if(meetingRoom == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(meetingRoom, HttpStatus.OK);
        }
    }

    @PostMapping
    public ResponseEntity<MeetingRoom> createMeetingRoom(@RequestBody MeetingRoom meetingRoom) {
        meetingRoomService.createMeetingRoom(meetingRoom);
        return new ResponseEntity<>(meetingRoom, HttpStatus.CREATED);
    }

    @PutMapping("{id}")
    public ResponseEntity<MeetingRoom> updateMeetingRoom(@PathVariable Long id, @RequestBody MeetingRoom meetingRoom) {
        meetingRoomService.updateMeetingRoom(id, meetingRoom);
        return ResponseEntity.accepted().build();
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteMeetingRoom(@PathVariable Long id) {
        meetingRoomService.deleteMeetingRoom(id);
        return ResponseEntity.noContent().build();
    }
}
