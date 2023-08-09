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
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class MovieServiceImpl implements MovieService {

	 private final MovieDao movieDao;
	    private final ObjectMapper objectMapper;

	    @Override
	    public void saveMoviesFromApi() {
	        log.info("영화 API 호출");
	        String movieId = "F";
	        List<String> movieSeqs = Arrays.asList("26312", "32372", "56635", "06697", "34240", "10779", "20520", "57556", "03559", "22274",
	                "09710", "05440", "31128", "02219", "07555", "04948", "05107", "07998", "38932", "13479");

	        RestTemplate restTemplate = new RestTemplate();

	        for (String movieSeq : movieSeqs) {
	            String apiUrl = "http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&detail=Y&ServiceKey=95B85M4L8264VL3I1IYE&listCount=1&genre=SF&movieId=" + movieId +"&movieSeq=" + movieSeq;

	            ResponseEntity<String> response = restTemplate.getForEntity(apiUrl, String.class);
	            String responseBody = response.getBody();

	            try {
	                // Parse JSON response using ObjectMapper
	                JsonNode rootNode = objectMapper.readTree(responseBody);
	                JsonNode dataNode = rootNode.get("Data").get(0);
	                JsonNode resultNode = dataNode.get("Result").get(0);

	                MovieDto movieDto = objectMapper.treeToValue(resultNode, MovieDto.class);

	                // Save the movie entity to the database
	                movieDao.save(movieDto);

	            } catch (IOException e) {
	                log.error("movieSeq: {}에 대한 JSON 응답 파싱 중 오류 발생", movieSeq, e);
	            }
	        }
	    }
	}
