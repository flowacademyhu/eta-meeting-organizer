package hu.flowacademy.meetingorganizer.persistence.model;

import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "participants")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Participant {

  @Id
  @Column(length = 100)
  private String email;

}
