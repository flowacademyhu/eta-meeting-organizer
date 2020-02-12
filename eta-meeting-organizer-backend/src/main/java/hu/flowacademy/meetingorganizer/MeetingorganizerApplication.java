package hu.flowacademy.meetingorganizer;

import hu.flowacademy.meetingorganizer.config.AppProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;


@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
public class MeetingorganizerApplication {

	public static void main(String[] args) {
		SpringApplication.run(MeetingorganizerApplication.class, args);
	}

}
