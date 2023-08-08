package com.back.api.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.back.api.service.MovieService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class MovieController {
	    private final MovieService movieService;

	    @PostMapping("/movies")
	    public ResponseEntity<String> fetchAndSaveMovies() {
	    	log.info("영화 api 호출");
	        String apiKey = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NTRlYjM4YWMzYjljZTIyODdiZDgwYmJkMTljNDc4ZCIsInN1YiI6IjY0YzlmNzdhODViMTA1MDEzOWFhMzgyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.31a_P_XfRmGX0ZtB3tT-FN38MPLksBzrUnTHL0aC1nU";
	        List<String> movieIds = Arrays.asList("157336", "324857", "1891", "27205","105","603","1124","348","280","38","62","10681","447365",
	        		"149","329","9323","10386","752","152601","545611"); 

	        movieService.fetchAndSaveMovieInfo(apiKey, movieIds);

	        return ResponseEntity.ok("Movies fetched and saved.");
	    }
}
