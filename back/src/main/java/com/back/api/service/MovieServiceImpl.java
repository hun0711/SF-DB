package com.back.api.service;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import com.back.api.repository.MovieDao;
import com.back.api.repository.MovieDto;
import com.back.user.repository.LoginDao;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class MovieServiceImpl implements MovieService {

	private final MovieDao movieDao;
	
	@Override
	public void saveMoviesFromApi() {
     log.info("영화 api 호출");
     List<String> movieSeqs = Arrays.asList("26312" , "32372" , "56635" , "06697" , "34240" , "10779" , "20520" , "57556" , "03559" , "22274" 
    		 , "09710" , "05440" , "31128" , "02219" , "07555" , "04948" , "05107" , "07998" , "38932" , "13479");

     ObjectMapper objectMapper = new ObjectMapper();
     
     for(String movieSeq : movieSeqs) {
		String apiUrl = "http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&detail=Y&ServiceKey=95B85M4L8264VL3I1IYE&listCount=1&genre=SF&movieSeq=" + movieSeq;
	
		 RestTemplate restTemplate = new RestTemplate();
         ResponseEntity<String> response = restTemplate.getForEntity(apiUrl, String.class);
         String responseBody = response.getBody();
     
    try {
        // Parse JSON response using ObjectMapper and MovieDto class
        MovieDto movieDto = objectMapper.readValue(responseBody, MovieDto.class);

        movieDto.setMovieTitle(movieDto.getMovieTitle());
        movieDto.setMovieOrignTitle(movieDto.getMovieOrignTitle());
        movieDto.setMovieProdYear(movieDto.getMovieProdYear());
        movieDto.setMovieDirectors(String.join(",", movieDto.getMovieDirectors()));
        movieDto.setMovieActors(String.join(",", movieDto.getMovieActors()));
        movieDto.setMovieNation(movieDto.getMovieNation());
        movieDto.setMoviePlots(String.join(",", movieDto.getMoviePlots()));
        movieDto.setMovieRuntime(movieDto.getMovieRuntime());
        movieDto.setMovieRating(movieDto.getMovieRating());
        movieDto.setMovieRepRlsDate(movieDto.getMovieRepRlsDate());
        movieDto.setMoviePosters(movieDto.getMoviePosters());

        // Save the movie entity to the database
        movieDao.save(movieDto);

    } catch (IOException e) {
        log.error("Error parsing JSON response for movieSeq: {}", movieSeq, e);
    }
	}
}
}