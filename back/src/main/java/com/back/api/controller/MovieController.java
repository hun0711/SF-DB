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
 
	    //영화 정보
	    @PostMapping("/movies")
	    public ResponseEntity<String> saveMoviesFromApi() {
	    	log.info("영화 api 호출");
	    	movieService.saveMoviesFromApi();
	    	return ResponseEntity.ok("Movies saved from API.");
	  }
	    //감독 정보
	    @PostMapping("/movies/directors")
	    public ResponseEntity<String> saveMovieDirectorsFromApi() {
	    	log.info("영화 감독정보 api 호출");
	        movieService.saveMovieDirectorsFromApi();
	        return ResponseEntity.ok("Movie Directors saved from Api.");
	    
	    }
	    
	    //배우 정보
	    @PostMapping("/movies/actors")
	    public ResponseEntity<String> saveMovieActorsFromApi(){
	    	log.info("영화 배우정보 api 호출");
	    	movieService.saveMovieActorsFromApi();
	    	return ResponseEntity.ok("Movie Actors saved from Api.");
	    }

       //일별 박스오피스 정보
	    @PostMapping("/movies/todayBoxoffice")
	    public ResponseEntity<String> todayBoxofficeFromApi(){
	       log.info("오늘 박스오피스 api 호출");
	       movieService.todayBoxofficeFromApi();
	       return ResponseEntity.ok("Boxoffice saved from Api.");
	    }


}
