package com.back.api.service;

import java.io.IOException;
import java.util.List;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
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
	public void fetchAndSaveMovieInfo(String apiKey, List<String> movieIds) {
		log.info("영화 api 호출");
		 RestTemplate restTemplate = new RestTemplate();

	        for (String movieId : movieIds) {
	            String apiUrl = "https://api.themoviedb.org/3/movie/" + movieId + "?language=ko-KR";
	            HttpHeaders headers = new HttpHeaders();
	            headers.set("Authorization", "Bearer " + apiKey);
	            HttpEntity<String> entity = new HttpEntity<>(headers);

	            ResponseEntity<String> response = restTemplate.exchange(apiUrl, HttpMethod.GET, entity, String.class);
	            String responseBody = response.getBody();

	            ObjectMapper objectMapper = new ObjectMapper();
	            try {
	                // Parse JSON response to a Movie object
	                MovieDto movieDto = objectMapper.readValue(responseBody, MovieDto.class);

	                movieDao.saveMovie(movieDto);
	            } catch (IOException e) {
	                e.printStackTrace();
	            }
	        }
	    }
	}
