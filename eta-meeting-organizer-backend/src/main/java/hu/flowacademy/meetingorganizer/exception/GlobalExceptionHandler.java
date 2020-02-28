package hu.flowacademy.meetingorganizer.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

@ControllerAdvice
@ResponseBody
public class GlobalExceptionHandler {

  @ExceptionHandler(NotFoundException.class)
  public ResponseEntity<String> handleNotFoundException(NotFoundException e) {
    return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler(AlreadyExistsException.class)
  public ResponseEntity<String> handleBadRequestException(AlreadyExistsException e) {
    return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
  }
}
