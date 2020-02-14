package hu.flowacademy.meetingorganizer.persistence.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "buildings")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Building {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String city;

  private String address;

  @OneToMany
  private List<MeetingRoom> meetingRoom;
}
