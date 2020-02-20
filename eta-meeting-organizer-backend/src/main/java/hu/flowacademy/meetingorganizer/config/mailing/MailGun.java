package hu.flowacademy.meetingorganizer.config.mailing;

import lombok.Data;

@Data
public class MailGun {

  private String apiKey;

  private String mailSenderUrl;
}
