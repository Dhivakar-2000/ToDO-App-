package com.in28minutes.rest.webservices.restfulwebservices;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class RestfulWebServicesApplication {

	public static void main(String[] args) {
		SpringApplication.run(RestfulWebServicesApplication.class, args);
	}

	//This is used to allow cross website engaging
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			//Here addcorsMappings is the tool we need to override
			public void addCorsMappings(CorsRegistry registry) {
				//all mappings = /**
				 registry.addMapping("/**")
				 //all methods = *
				         .allowedMethods("*")
				         //the significant website
				         .allowedOriginPatterns("http://localhost:3000");
			}

		};
	}
	
}
