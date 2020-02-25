package hu.flowacademy.meetingorganizer.email;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;

@Slf4j
@RequiredArgsConstructor
public class GmailService implements EmailService {

  @NonNull
  private final JavaMailSender mailSender;
  @NonNull
  private final EmailFactory emailFactory;

  @Async
  @Override
  public void send(String to, String subject, EmailType emailType, Object... bodyParams) {
    SimpleMailMessage message = new SimpleMailMessage();
    message.setTo(to);
    message.setSubject(subject);
    message.setText(emailFactory.buildContent(emailType, bodyParams).getValue());
    mailSender.send(message);
  }
}
