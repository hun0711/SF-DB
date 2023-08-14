package com.back.api.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.back.api.service.ApiService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class ApiController {
	    private final ApiService apiService;
 
/************************ API 데이터 호출  ***********************/	    
	    //영화 정보 호출
	    @PostMapping("/movies")
	    public ResponseEntity<String> saveMoviesFromApi() {
	    	log.info("영화 api 호출");
	    	apiService.saveMoviesFromApi();
	    	return ResponseEntity.ok("Movies saved from API.");
	  }

       //일별 박스오피스 정보 호출
	    @PostMapping("/movies/todayBoxoffice")
	    public ResponseEntity<String> todayBoxofficeFromApi(){
	       log.info("오늘 박스오피스 api 호출");
	       apiService.todayBoxofficeFromApi();
	       return ResponseEntity.ok("Boxoffice saved from Api.");
	    }

       //추천 영화 정보 호출
	    @PostMapping("/movies/recommendMovies")
	    public ResponseEntity<String> recommendMovies() {
	    	log.info("추천 영화 정보 호출");
	    	apiService.recommendMovies();
	    	return ResponseEntity.ok("Recommend Movies saved from Api.");
	    }
	   
	    //개봉 예정 영화 정보 호출
	    @PostMapping("/movies/releaseSoonMovies")
	    public ResponseEntity<String> releaseSoonMovies() {
	    	log.info("추천 영화 정보 호출");
	    	apiService.releaseSoonMovies();
	    	return ResponseEntity.ok("ReleaseSoon Movies saved from Api.");
	    }
	    
	    
}
