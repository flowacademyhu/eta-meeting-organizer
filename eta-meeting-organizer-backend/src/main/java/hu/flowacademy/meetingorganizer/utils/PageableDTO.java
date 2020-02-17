package hu.flowacademy.meetingorganizer.utils;

import java.util.List;

public class PageableDTO<T> {

  private PageableMetadata metadata;

  private List<T> embedded;

}
