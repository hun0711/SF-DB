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
	    public ResponseEntity<String> saveMoviesFromApi() {
	    	log.info("영화 api 호출");
	    	movieService.saveMoviesFromApi();
	    	return ResponseEntity.ok("Movies saved from API.");
	  }
 }
