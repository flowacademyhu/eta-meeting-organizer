package hu.flowacademy.meetingorganizer.service;

import hu.flowacademy.meetingorganizer.persistence.model.MeetingRoom;
import hu.flowacademy.meetingorganizer.persistence.repository.MeetingRoomRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@AllArgsConstructor
@Transactional
public class MeetingRoomService {

    private MeetingRoomRepository meetingRoomRepository;

    public List<MeetingRoom> findAllMeetingRooms () {
        return meetingRoomRepository.findAll();
    }

    public MeetingRoom findOneMeetingRoomById (Long id) {
        return meetingRoomRepository.findById(id).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public ResponseEntity<?> createMeetingRoom (MeetingRoom meetingRoom) {
        meetingRoomRepository.save(meetingRoom);
        return new ResponseEntity<>(meetingRoom, HttpStatus.CREATED);
    }

    public ResponseEntity<Void> deleteMeetingRoom (Long id) {
        meetingRoomRepository.deleteById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    public ResponseEntity<MeetingRoom> updateMeetingRoom (Long id, MeetingRoom meetingRoom) {
        if (meetingRoomRepository.findById(id).isPresent()) {
            MeetingRoom room = meetingRoomRepository.findById(id).get();
            meetingRoomRepository.save(room);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.status(HttpStatus.ACCEPTED).build();
    }
}
