package hu.flowacademy.meetingorganizer.email;

public enum EmailType {
  CREATE("new-meeting.html"),
  UPDATE("update-meeting.html"),
  DELETE("delete-meeting.html"),
  VERIFY("verify-registration.html");

  private String templateName;

  EmailType(String templateName) {
    this.templateName = templateName;
  }

  public String getTemplateName() {
    return templateName;
  }
}
