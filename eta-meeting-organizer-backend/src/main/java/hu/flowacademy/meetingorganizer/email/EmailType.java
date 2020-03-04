package hu.flowacademy.meetingorganizer.email;

public enum EmailType {
  CREATE("new-reservation.html"),
  UPDATE("update-reservation.html"),
  DELETE("delete-reservation.html"),
  VERIFY("verify-registration.html");

  private String templateName;

  EmailType(String templateName) {
    this.templateName = templateName;
  }

  public String getTemplateName() {
    return templateName;
  }
}
