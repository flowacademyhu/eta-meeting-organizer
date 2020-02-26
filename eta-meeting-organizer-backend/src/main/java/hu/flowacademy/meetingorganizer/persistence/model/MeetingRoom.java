package hu.flowacademy.meetingorganizer.persistence.model;

import javax.persistence.Column;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "meeting_rooms")
public class MeetingRoom {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotNull
  @Column(unique = true)
  private String name;

  @NotNull
  private Integer numberOfSeats;

  @NotNull
  private Boolean projector;

  @ManyToOne
  private Building building;
}
