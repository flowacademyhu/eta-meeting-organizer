package hu.flowacademy.meetingorganizer.config;

import java.util.List;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "role")
public class RoleConfigs {

  private List<String> admins;

  private List<String> readers;

  public List<String> getAdmins() {
    return admins;
  }

  public void setAdmins(List<String> admins) {
    this.admins = admins;
  }

  public List<String> getReaders() {
    return readers;
  }

  public void setReaders(List<String> readers) {
    this.readers = readers;
  }
}
