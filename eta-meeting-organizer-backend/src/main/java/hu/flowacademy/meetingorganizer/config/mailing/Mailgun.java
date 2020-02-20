package hu.flowacademy.meetingorganizer.config.mailing;

import lombok.Data;

@Data
public class Mailgun {

  private String apiKey;

  private String mailSenderUrl;
}
