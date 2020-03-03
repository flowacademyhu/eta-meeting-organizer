package hu.flowacademy.meetingorganizer.config.mailing;

import hu.flowacademy.meetingorganizer.email.GmailService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;

@Configuration
@RequiredArgsConstructor
public class EmailConfig {

  @NonNull
  private final JavaMailSender mailSender;
  @NonNull
  private final EmailFactory emailFactory;

  @Bean
  public EmailService getEmailService() {
    return new GmailService(mailSender, emailFactory);
  }
}
