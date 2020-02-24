package hu.flowacademy.meetingorganizer.email;

import hu.flowacademy.meetingorganizer.config.mailing.MailingConfig;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Slf4j
@RequiredArgsConstructor
public class MailgunEmailService implements EmailService {

  @NonNull
  private final MailingConfig mailingConfig;
  @NonNull
  private final EmailFactory emailFactory;
  private final RestTemplate restTemplate = new RestTemplate();

  @Override
  public void send(String to, String subject, EmailType emailType, Object... bodyParams) {
    asyncSend(
        emailFactory.buildEmail(mailingConfig.getMailFrom(), to, subject, emailType, bodyParams),
        createHeader());
  }

  private HttpHeaders createHeader() {
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
    headers.setBasicAuth("api", mailingConfig.getMailgun().getApiKey());
    return headers;
  }

  @Async
  private void asyncSend(MultiValueMap<String, String> body, HttpHeaders headers) {
    try {
      HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);
      ResponseEntity<String> response = restTemplate
          .postForEntity(mailingConfig.getMailgun().getMailSenderUrl() + "/messages",
              request, String.class);

      log.info("Mail send with request [{}] and got [{}]", request, response);
    } catch (Throwable t) {
      log.error("Error when email sending", t);
    }
  }
}
