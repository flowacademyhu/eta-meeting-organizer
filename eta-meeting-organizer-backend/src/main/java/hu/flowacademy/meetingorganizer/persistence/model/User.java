package hu.flowacademy.meetingorganizer.persistence.model;
import com.fasterxml.jackson.annotation.JsonBackReference;
import hu.flowacademy.meetingorganizer.persistance.Role;
import hu.flowacademy.meetingorganizer.persistance.model.Reservation;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "users")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "role")
    private Role role;

    @Column
    @JsonBackReference
    @OneToMany(cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            mappedBy = "user")
    private List<Reservation> reservations;

}
