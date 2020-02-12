package hu.flowacademy.meetingorganizer.service;

import hu.flowacademy.meetingorganizer.persistance.model.MeetingRoom;
import hu.flowacademy.meetingorganizer.persistance.repository.MeetingRoomRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.NoSuchElementException;

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

    public MeetingRoom createMeetingRoom (MeetingRoom meetingRoom) {
        return meetingRoomRepository.save(meetingRoom);
    }

    public void deleteMeetingRoom (Long id) {
        meetingRoomRepository.deleteById(id);
    }

    public MeetingRoom updateMeetingRoom (Long id, MeetingRoom meetingRoom) {
        if (meetingRoomRepository.findById(id).isPresent()) {
            MeetingRoom room = meetingRoomRepository.findById(id).orElseThrow(NoSuchElementException::new);
            room.setId(id);
            return meetingRoomRepository.save(room);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }
}
