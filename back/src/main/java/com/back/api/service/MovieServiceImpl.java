package com.back.api.service;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import com.back.api.repository.MovieActorsDto;
import com.back.api.repository.MovieDao;
import com.back.api.repository.MovieDirectorsDto;
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
	    String movieId = "F";

	    List<String> movieSeqs = Arrays.asList("26312", "32372", "56635", "06697", "34240", "10779", "20520", "57556", "03559", "22274",
	    		"09710", "05440", "31128", "02219", "07555", "04948", "05107", "07998", "38932", "13479");
	    RestTemplate restTemplate = new RestTemplate();
	  
	    
	    //영화 정보
	    @Override
	    public void saveMoviesFromApi() {
	        log.info("영화 API 호출");


	        for (String movieSeq : movieSeqs) {
	            String apiUrl = "http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&detail=Y&ServiceKey=95B85M4L8264VL3I1IYE&listCount=1&genre=SF&movieId=" + movieId +"&movieSeq=" + movieSeq;

	            ResponseEntity<String> response = restTemplate.getForEntity(apiUrl, String.class);
	            String responseBody = response.getBody();

	            try {
	                // Parse JSON response using ObjectMapper
	                JsonNode rootNode = objectMapper.readTree(responseBody);
	                JsonNode dataNode = rootNode.get("Data").get(0);
	                JsonNode resultNode = dataNode.get("Result").get(0);
	                JsonNode directorsNode = resultNode.get("directors").get("director");
	                JsonNode actorsNode = resultNode.get("actors").get("actor");
	                JsonNode plotsNode = resultNode.get("plots").get("plot");
	                JsonNode posterNode = resultNode.get("posters");
	                JsonNode awardsNode = resultNode.get("Awards1");
	                
	                
	                MovieDto movieDto = objectMapper.treeToValue(resultNode, MovieDto.class);
	             
	                //감독
	                if (directorsNode != null && directorsNode.isArray() && directorsNode.size() > 0) {
	                    List<String> directorIdList = new ArrayList<>();

	                    for (JsonNode directorNode : directorsNode) {
	                        String directorId = directorNode.get("directorId").asText();
	                        directorIdList.add(directorId);
	                    }
                        String directorIds = String.join("," , directorIdList);
	                    movieDto.setDirectorIds(directorIds); 
	                }
	                
	                //배우
	                if (actorsNode != null && actorsNode.isArray() && actorsNode.size() > 0) {
	                   List<String> actorNmList = new ArrayList<>();
	                   
	                   for (JsonNode actorNode : actorsNode) {
	                	   String actorNm = actorNode.get("actorNm").asText();
	                	   actorNmList.add(actorNm);
	                   }
	                   String actorNms = String.join(",", actorNmList);
	                   movieDto.setActorNms(actorNms);
	                }
	                
	                // 줄거리
	                if (plotsNode != null && plotsNode.isArray() && plotsNode.size() > 0) {
	                    JsonNode plotTextNode = plotsNode.get(0).get("plotText");
	                    if (plotTextNode != null) {
	                        String plotText = plotTextNode.asText();
	                        movieDto.setPlotText(plotText);
	                    }
	                }

	                // 포스터
	                if (posterNode != null && posterNode.isTextual()) {
	                    String posterData = posterNode.asText();
	                    String[] posterUrls = posterData.split("\\|"); // |를 기준으로 분리

	                    if (posterUrls.length > 0) {
	                        String firstPosterUrl = posterUrls[0];
	                        movieDto.setPoster(firstPosterUrl);
	                    }
	                }

	                
	                //수상내역
	                if (awardsNode != null && awardsNode.isTextual()) {
	                	String awards1 = awardsNode.asText();
	                	movieDto.setAwards1(awards1);
	                }

	                
	                movieDao.save(movieDto);

	            } catch (IOException e) {
	                log.error("movieSeq: {}에 대한 JSON 응답 파싱 중 오류 발생", movieSeq, e);
	            }
	        }
	    }

       
	    
	    
	    //감독정보	    
		@Override
		public void saveMovieDirectorsFromApi() {
            log.info("영화 감독정보 api 호출");

	        for (String movieSeq : movieSeqs) {
	            String apiUrl = "http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&detail=Y&ServiceKey=95B85M4L8264VL3I1IYE&listCount=1&genre=SF&movieId=" + movieId +"&movieSeq=" + movieSeq;

	            ResponseEntity<String> response = restTemplate.getForEntity(apiUrl, String.class);
	            String responseBody = response.getBody();

	            try {
	            	log.info("감독 정보 저-장");
	                // Parse JSON response using ObjectMapper
	                JsonNode rootNode = objectMapper.readTree(responseBody);
	                JsonNode dataNode = rootNode.get("Data").get(0);
	                JsonNode resultNode = dataNode.get("Result").get(0);
	                JsonNode directorsNode = resultNode.get("directors").get("director");
	                
	                for (JsonNode directorNode : directorsNode) {
	                    MovieDirectorsDto movieDirectorsDto = objectMapper.treeToValue(directorNode, MovieDirectorsDto.class);
	                    if (!movieDao.existsDirectorById(movieDirectorsDto.getDirectorId())) {
		                    movieDao.saveDirectors(movieDirectorsDto);
		                } else {
		                    log.info("감독 정보가 이미 존재합니다. directorId: {}", movieDirectorsDto.getDirectorId());
		                }
	                }
	            } catch (IOException e) {
	                log.error("movieSeq: {}에 대한 JSON 응답 파싱 중 오류 발생", movieSeq, e);
	            }
	        }
	    }



       //배우 정보
		@Override
		public void saveMovieActorsFromApi() {
			  log.info("영화 배우정보 api 호출");

		        for (String movieSeq : movieSeqs) {
		            String apiUrl = "http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&detail=Y&ServiceKey=95B85M4L8264VL3I1IYE&listCount=1&genre=SF&movieId=" + movieId +"&movieSeq=" + movieSeq;

		            ResponseEntity<String> response = restTemplate.getForEntity(apiUrl, String.class);
		            String responseBody = response.getBody();	
		          
		            try {
		            	log.info("배우 정보 저-장");
		                // Parse JSON response using ObjectMapper
		                JsonNode rootNode = objectMapper.readTree(responseBody);
		                JsonNode dataNode = rootNode.get("Data").get(0);
		                JsonNode resultNode = dataNode.get("Result").get(0);
		                JsonNode actorsNode = resultNode.get("actors").get("actor");
		                
		                for (JsonNode actorNode : actorsNode) {
		                    MovieActorsDto movieActorsDto = objectMapper.treeToValue(actorNode, MovieActorsDto.class);
		                    if (!movieDao.existsActorById(movieActorsDto.getActorId())) {
			                    movieDao.saveActors(movieActorsDto);
			                } else {
			                    log.info("배우 정보가 이미 존재합니다. directorId: {}", movieActorsDto.getActorId());
			                }
		                }
		            
		            }catch(IOException e){
		        	  log.error("movieSeq: {}에 대한 JSON 응답 파싱 중 오류 발생", movieSeq, e);
		          }
		}
    }



        //박스오피스 정보
		@Override
		public void todayBoxofficeFromApi() {
           log.info("박스오피스 정보 호출");
           // 현재 날짜 가져오기
           LocalDate currentDate = LocalDate.now();
           // 하루 전 날짜 계산
           LocalDate previousDate = currentDate.minusDays(1);
           // 날짜 포맷 지정
           DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
           // 날짜를 문자열로 변환
           String targetDt = previousDate.format(formatter);
           String kobisApiUrl = "http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=6235a2b9f4ec21af4ef3e725e96e4968&targetDt=" + targetDt;
          
           
           ResponseEntity<String> response = restTemplate.getForEntity(kobisApiUrl, String.class);
           String responseBody = response.getBody();
           try {
               // JSON 파싱
               JsonNode rootNode = objectMapper.readTree(responseBody);
               JsonNode dailyBoxOfficeList = rootNode.path("boxOfficeResult").path("dailyBoxOfficeList");

               for (JsonNode movieNode : dailyBoxOfficeList) {
                   String movieNm = movieNode.path("movieNm").asText();
                   String secondApiUrl = "http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&detail=Y&ServiceKey=95B85M4L8264VL3I1IYE&listCount=1&title=" + movieNm;

                   ResponseEntity<String> secondApiResponse = restTemplate.getForEntity(secondApiUrl, String.class);
                   String secondResponseBody = secondApiResponse.getBody();

                   // JSON 파싱하여 영화 정보 추출
                   JsonNode resultNode = objectMapper.readTree(secondResponseBody).path("Data").path(0).path("Result").path(0);

                   // 감독 정보 추출
                   List<String> directorIdList = new ArrayList<>();
                   JsonNode directorsNode = resultNode.path("directors").path("director");
                   if (directorsNode != null && directorsNode.isArray()) {
                       for (JsonNode directorNode : directorsNode) {
                           String directorId = directorNode.path("directorId").asText();
                           directorIdList.add(directorId);
                       }
                   }
                   String directorIds = String.join(",", directorIdList);

                   // 배우 정보 추출
                   List<String> actorNmList = new ArrayList<>();
                   JsonNode actorsNode = resultNode.path("actors").path("actor");
                   if (actorsNode != null && actorsNode.isArray()) {
                       for (JsonNode actorNode : actorsNode) {
                           String actorNm = actorNode.path("actorNm").asText();
                           actorNmList.add(actorNm);
                       }
                   }
                   String actorNms = String.join(",", actorNmList);

                   // MovieDto에 추가 정보 설정
                   MovieDto movieDto = new MovieDto();
                   movieDto.setDirectorIds(directorIds);
                   movieDto.setActorNms(actorNms);

                   // movieDao에 저장
                   movieDao.save(movieDto);
               }
           } catch (IOException e) {
               log.error("JSON 응답 파싱 중 오류 발생", e);
           }
}
}