package hu.flowacademy.meetingorganizer.persistence.model.dto;

import hu.flowacademy.meetingorganizer.persistence.model.MeetingRoom;
import hu.flowacademy.meetingorganizer.persistence.model.Reservation;
import hu.flowacademy.meetingorganizer.persistence.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReservationDTO {

  private String userId;

  private Long meetingRoomId;

  private Long startingTime;

  private Long endingTime;

  private String title;

  private String summary;

  public Reservation toSaveEntity(User user, MeetingRoom meetingRoom) {
    Reservation reservation = new Reservation();
    reservation.setUser(user);
    reservation.setMeetingRoom(meetingRoom);
    BeanUtils.copyProperties(this, reservation);
    return reservation;
  }

  public Reservation toUpdateEntity(Long id, User user, MeetingRoom meetingRoom) {
    Reservation reservation = new Reservation();
    reservation.setId(id);
    reservation.setUser(user);
    reservation.setMeetingRoom(meetingRoom);
    BeanUtils.copyProperties(this, reservation);
    return reservation;
  }
}