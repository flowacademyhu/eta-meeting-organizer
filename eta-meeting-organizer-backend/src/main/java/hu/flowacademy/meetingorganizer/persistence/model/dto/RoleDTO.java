package hu.flowacademy.meetingorganizer.persistence.model.dto;

import hu.flowacademy.meetingorganizer.persistence.model.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class RoleDTO {

  private Role role;
}
