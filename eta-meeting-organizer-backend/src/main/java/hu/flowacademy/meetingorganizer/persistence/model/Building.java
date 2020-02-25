package hu.flowacademy.meetingorganizer.persistence.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import javax.validation.constraints.Pattern;
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

  @Column(nullable = false)
  private String city;

  @Column(nullable = false, unique = true)
  @Pattern()
  private String address;

  @Column(nullable = false, unique = true)
  private String buildingName;

  @OneToMany
  @JsonIgnore
  @JoinTable(name = "building_meetingrooms")
  private List<MeetingRoom> meetingRoom;
}
