package hu.flowacademy.meetingorganizer.email;

import hu.flowacademy.meetingorganizer.config.mailing.MailingConfig;
import java.util.AbstractMap.SimpleEntry;
import java.util.Map.Entry;
import java.util.Objects;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

@Component
@RequiredArgsConstructor
public class EmailFactory {

  public static final String TYPE_TEXT = "text";
  public static final String TYPE_HTML = "html";

  @NonNull
  private final MailingConfig mailingConfig;

  public MultiValueMap<String, String> buildEmail(String from, String to, String subject,
      EmailType emailType, Object... bodyParams) {
    MultiValueMap<String, String> requestData = new LinkedMultiValueMap<>();
    requestData.add("from", from);
    requestData.add("to", to);
    requestData.add("subject", subject);
    var body = buildContent(emailType, bodyParams);
    requestData.add(body.getKey(), body.getValue());
    return requestData;
  }

  public Entry<String, String> buildContent(EmailType emailType, Object... params) {
    if (EmailType.TEXT.equals(emailType)) {
      if (params == null) {
        return new SimpleEntry<>(TYPE_TEXT, mailingConfig.getMessageTemplate());
      }
      return new SimpleEntry<>(TYPE_TEXT,
          String.format(mailingConfig.getMessageTemplate(), params));
    } else if (EmailType.HTML.equals(emailType)) {
      return new SimpleEntry<>(TYPE_HTML, "<h1>Missing html template engine...</h1>");
    }
    throw new IllegalArgumentException(Objects.toString(emailType));
  }
}
