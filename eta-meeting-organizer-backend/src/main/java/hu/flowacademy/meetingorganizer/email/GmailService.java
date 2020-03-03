package hu.flowacademy.meetingorganizer.email;

import java.util.Locale;
import java.util.Map;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Slf4j
@Service
@AllArgsConstructor
public class GmailService {


  private final JavaMailSender mailSender;
  private final TemplateEngine templateEngine;

  @Async
  public void send(String to, String subject, String templateName, Map<String, Object> params) {
    send(to, subject, templateEngine.process(templateName, new Context(Locale.ENGLISH, params)));
  }

  private void send(String to, String subject, String text) {
    try {
      final MimeMessage mimeMessage = this.mailSender.createMimeMessage();
      final MimeMessageHelper message = new MimeMessageHelper(mimeMessage, true, "UTF-8");
      message.setTo(to);
      message.setSubject(subject);
      message.setText(text, true);
      mailSender.send(mimeMessage);
    } catch (MessagingException e) {
      e.printStackTrace();
    }

  }
}
