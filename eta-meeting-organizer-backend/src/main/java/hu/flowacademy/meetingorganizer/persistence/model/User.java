package hu.flowacademy.meetingorganizer.persistence.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.Collection;
import java.util.Map;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;


@Entity
@Table(name = "_user")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User implements OAuth2User, UserDetails {

  private static final String DEFAULT_TRUE = "BOOLEAN default true";

  @Id
  @Column(length = 100)
  private String id;
  @Column(unique = true, length = 100)
  private String username;
  @Transient
  @JsonIgnore
  private String password;
  @Enumerated(EnumType.STRING)
  private Role role;
  @Column(columnDefinition = DEFAULT_TRUE)
  private boolean isVerifiedByAdmin;
  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
  @Transient
  @JsonIgnore
  private Collection<UserAuthority> authorities;
  @Transient
  @JsonIgnore
  private Map<String, Object> attributes;
  @Column(columnDefinition = DEFAULT_TRUE)
  private boolean enabled;
  @Column(columnDefinition = DEFAULT_TRUE)
  private boolean accountNonExpired;
  @Column(columnDefinition = DEFAULT_TRUE)
  private boolean accountNonLocked;
  @Column(columnDefinition = DEFAULT_TRUE)
  private boolean credentialsNonExpired;

  @Transient
  @JsonIgnore
  @Override
  public String getName() {
    return username;
  }

  @Data
  @Entity
  @Table(name = "user_authority")
  @NoArgsConstructor
  @AllArgsConstructor
  public static class UserAuthority implements GrantedAuthority {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String authority;
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    public UserAuthority(GrantedAuthority grantedAuthority) {
      this.authority = grantedAuthority.getAuthority();
    }
  }

}
