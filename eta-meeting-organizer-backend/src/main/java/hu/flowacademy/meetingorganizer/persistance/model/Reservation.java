package hu.flowacademy.meetingorganizer.persistance.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "reservations")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User owner;

    @OneToOne
    private MeetingRoom meetingRoom;

    private LocalDateTime startingTime;

    private LocalDateTime endingTime;

    private String title;

    private String summary;

}
