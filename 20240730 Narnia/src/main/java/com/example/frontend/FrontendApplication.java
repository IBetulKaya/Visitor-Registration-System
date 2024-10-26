package com.example.frontend;

import com.example.frontend.model.Tourist;
import com.example.frontend.service.TouristService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class FrontendApplication implements CommandLineRunner {

	@Autowired
	TouristService touristService;

	public static void main(String[] args) {
		SpringApplication.run(FrontendApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

		Tourist tourist = new Tourist("Hatice", "Altay", "Asperen", 41);
		touristService.save(tourist);
		tourist = new Tourist("Betul", "Kaya", "Nijmegen", 33);
		touristService.save(tourist);
		tourist = new Tourist("Caner", "Unal", "Haarlem", 41);
		touristService.save(tourist);
		tourist = new Tourist("Talat", "Turan", "Rotterdam", 33);
		touristService.save(tourist);
		tourist = new Tourist("Bashar", "Alshaibani", "Eindhoven", 41);
		touristService.save(tourist);
		tourist = new Tourist("Ebrahim", "Albashari", "Utrecht", 33);
		touristService.save(tourist);
		tourist = new Tourist("Samir", "Abubakiri", "Amersfoort", 33);
		touristService.save(tourist);

	}
}
