package hu.flowacademy.meetingorganizer.config;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import hu.flowacademy.meetingorganizer.persistence.model.Role;
import hu.flowacademy.meetingorganizer.persistence.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class TokenProvider {

  private static final int TOKEN_EXPIRATION_MSEC = 1800000;
  private static final String TOKEN_SECRET = "JgxeWFNIeJ4mEIKd8gH5VGw_";
  private final ObjectMapper objectMapper = new ObjectMapper();

  public String createToken(Authentication authentication) {
    User user = (User) authentication.getPrincipal();

    Date now = new Date();
    Date expiryDate = new Date(now.getTime() + TOKEN_EXPIRATION_MSEC);

    return Jwts.builder()
        .setPayload(setupPayload(user, expiryDate))
        .signWith(SignatureAlgorithm.HS512, TOKEN_SECRET)
        .compact();
  }

  private String setupPayload(User user, Date expiryDate) {
    try {
      return objectMapper.writeValueAsString(
          JwtPayload.builder().username(user.getUsername())
              .role(user.getRole())
              .isVerified(user.isVerifiedByAdmin())
              .sub(user.getId())
              .expr(expiryDate)
              .iat(new Date())
              .build());
    } catch (JsonProcessingException e) {
      log.error("JSON parse error", e);
      return "";
    }
  }

  public String getUserIdFromToken(String token) {
    Claims claims = Jwts.parser()
        .setSigningKey(TOKEN_SECRET)
        .parseClaimsJws(token)
        .getBody();

    return claims.getSubject();
  }

  public boolean validateToken(String authToken) {
    try {
      Jwts.parser().setSigningKey(TOKEN_SECRET).parseClaimsJws(authToken);
      return true;
    } catch (SignatureException ex) {
      log.error("Invalid JWT signature");
    } catch (MalformedJwtException ex) {
      log.error("Invalid JWT token");
    } catch (ExpiredJwtException ex) {
      log.error("Expired JWT token");
    } catch (UnsupportedJwtException ex) {
      log.error("Unsupported JWT token");
    } catch (IllegalArgumentException ex) {
      log.error("JWT claims string is empty.");
    }
    return false;
  }

  @Data
  @Builder
  @NoArgsConstructor
  @AllArgsConstructor
  private static class JwtPayload {
    private String username;
    // Subject
    private String sub;
    // IssuedAt
    private Date iat;
    // ExpirationDate
    private Date expr;
    private Role role;
    private boolean isVerified;
  }
}
