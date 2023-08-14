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
	
	import com.back.api.repository.BoxOfficeDto;
	import com.back.api.repository.MovieActorsDto;
	import com.back.api.repository.ApiDao;
	import com.back.api.repository.MovieDirectorsDto;
	import com.back.api.repository.MovieDto;
import com.back.api.repository.RecommendMovieDto;
import com.back.api.repository.ReleaseSoonMovieDto;
import com.back.user.repository.LoginDao;
	import com.fasterxml.jackson.databind.JsonNode;
	import com.fasterxml.jackson.databind.ObjectMapper;
	
	import lombok.RequiredArgsConstructor;
	import lombok.extern.slf4j.Slf4j;
	
	@Service
	@Slf4j
	@RequiredArgsConstructor
	public class ApiServiceImpl implements ApiService {
	
		 private final ApiDao apiDao;
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
		                        
		                        //감독 db 저장
		                        MovieDirectorsDto movieDirectorsDto = objectMapper.treeToValue(directorNode, MovieDirectorsDto.class);
			                    if (!apiDao.existsDirectorById(movieDirectorsDto.getDirectorId())) {
				                    apiDao.saveDirectors(movieDirectorsDto);
				                } else {
				                    log.info("감독 정보가 이미 존재합니다. directorId: {}", movieDirectorsDto.getDirectorId());
				                }
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
		                	   
		                	   //배우 db 저장
		                	    MovieActorsDto movieActorsDto = objectMapper.treeToValue(actorNode, MovieActorsDto.class);
			                    if (!apiDao.existsActorById(movieActorsDto.getActorId())) {
				                    apiDao.saveActors(movieActorsDto);
				                } else {
				                    log.info("배우 정보가 이미 존재합니다. directorId: {}", movieActorsDto.getActorId());
				                }
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
	
		                
		                apiDao.save(movieDto);
	
		            } catch (IOException e) {
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
	                   String title = movieNode.path("movieNm").asText();
	                   String secondApiUrl = "http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&detail=Y&ServiceKey=95B85M4L8264VL3I1IYE&ratedYn=y&sort=prodYear,1&listCount=1&title=" + title;
	
	                   ResponseEntity<String> secondApiResponse = restTemplate.getForEntity(secondApiUrl, String.class);
	                   String secondResponseBody = secondApiResponse.getBody();
	
	                   // JSON 파싱하여 영화 정보 추출
	                   JsonNode kmdbrootNode = objectMapper.readTree(secondResponseBody);
	                   JsonNode dataNode = kmdbrootNode.get("Data").get(0);
		               JsonNode resultNode = dataNode.get("Result").get(0);
		               JsonNode directorsNode = resultNode.get("directors").get("director");
		               JsonNode actorsNode = resultNode.get("actors").get("actor");
		               JsonNode plotsNode = resultNode.get("plots").get("plot");
		               JsonNode posterNode = resultNode.get("posters");
		               JsonNode awardsNode = resultNode.get("Awards1");
	
	                 
		               BoxOfficeDto boxOfficeDto = objectMapper.treeToValue(resultNode, BoxOfficeDto.class);
		               
	                 
		               //감독
		                if (directorsNode != null && directorsNode.isArray() && directorsNode.size() > 0) {
		                    List<String> directorIdList = new ArrayList<>();
	                        List<String> directorNmList = new ArrayList<>();
		                    for (JsonNode directorNode : directorsNode) {
		                        String directorId = directorNode.get("directorId").asText();
		                        String directorNm = directorNode.get("directorNm").asText();
		                        directorIdList.add(directorId);
		                        directorNmList.add(directorNm);
		                        
		                        MovieDirectorsDto movieDirectorsDto = objectMapper.treeToValue(directorNode, MovieDirectorsDto.class);
			                    if (!apiDao.existsDirectorById(movieDirectorsDto.getDirectorId())) {
				                    apiDao.saveDirectors(movieDirectorsDto);
				                } else {
				                    log.info("감독 정보가 이미 존재합니다. directorId: {}", movieDirectorsDto.getDirectorId());
				                }
		                    }
	                       String directorIds = String.join("," , directorIdList);
	                       String directorNms = String.join("," , directorNmList);
		                   boxOfficeDto.setDirectorIds(directorIds); 
		                   boxOfficeDto.setDirectorNms(directorNms); 
		                    
		                }
		                
		                //배우
		                if (actorsNode != null && actorsNode.isArray() && actorsNode.size() > 0) {
		                   List<String> actorNmList = new ArrayList<>();
		                   
		                   for (JsonNode actorNode : actorsNode) {
		                	   String actorNm = actorNode.get("actorNm").asText();
		                	   actorNmList.add(actorNm);
		                	   
		                	    MovieActorsDto movieActorsDto = objectMapper.treeToValue(actorNode, MovieActorsDto.class);
			                    if (!apiDao.existsActorById(movieActorsDto.getActorId())) {
				                    apiDao.saveActors(movieActorsDto);
				                } else {
				                    log.info("배우 정보가 이미 존재합니다. directorId: {}", movieActorsDto.getActorId());
				                }
		                   }
		                   String actorNms = String.join(",", actorNmList);
		                   boxOfficeDto.setActorNms(actorNms);
		                   
		                }
		                
		                // 줄거리
		                if (plotsNode != null && plotsNode.isArray() && plotsNode.size() > 0) {
		                    JsonNode plotTextNode = plotsNode.get(0).get("plotText");
		                    if (plotTextNode != null) {
		                        String plotText = plotTextNode.asText();
		                        boxOfficeDto.setPlotText(plotText);
		                    }
		                }
	
		                // 포스터
		                if (posterNode != null && posterNode.isTextual()) {
		                    String posterData = posterNode.asText();
		                    String[] posterUrls = posterData.split("\\|"); // |를 기준으로 분리
	
		                    if (posterUrls.length > 0) {
		                        String firstPosterUrl = posterUrls[0];
		                        boxOfficeDto.setPoster(firstPosterUrl);
		                    }
		                }
	
		                
		                //수상내역
		                if (awardsNode != null && awardsNode.isTextual()) {
		                	String awards1 = awardsNode.asText();
		                	boxOfficeDto.setAwards1(awards1);
		                }
	                   
		             // movieDao에 저장
		                if (!apiDao.existsBoxofficeByTitle(title)) {
		                    apiDao.saveBoxOffice(boxOfficeDto);
		                } else {
		                    log.info("영화명 '{}'이(가) 이미 존재하여 저장하지 않음", title);
		                }
	               }
	           } catch (IOException e) {
	               log.error("JSON 응답 파싱 중 오류 발생", e);
	           }
	}




              //추천 영화
			@Override
			public void recommendMovies() {
				
				   log.info("추천 영화 API 호출");
				   String movieId = "F";
				   List<String> movieSeqs = Arrays.asList(
						   "55331", "20431" , "29320" , "26048" , "48274" , "45831" , "02817" , "58450" , "25891" , "08856"
						  );
					
				   
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
			                
			                
			                RecommendMovieDto recommendmovieDto = objectMapper.treeToValue(resultNode, RecommendMovieDto.class);
			                MovieDto movieDto = objectMapper.treeToValue(resultNode, MovieDto.class);
			                
			                //감독
			                if (directorsNode != null && directorsNode.isArray() && directorsNode.size() > 0) {
			                    List<String> directorIdList = new ArrayList<>();
		
			                    for (JsonNode directorNode : directorsNode) {
			                        String directorId = directorNode.get("directorId").asText();
			                        directorIdList.add(directorId);
			                        
			                        //감독 db 저장
			                        MovieDirectorsDto movieDirectorsDto = objectMapper.treeToValue(directorNode, MovieDirectorsDto.class);
				                    if (!apiDao.existsDirectorById(movieDirectorsDto.getDirectorId())) {
					                    apiDao.saveDirectors(movieDirectorsDto);
					                } else {
					                    log.info("감독 정보가 이미 존재합니다. directorId: {}", movieDirectorsDto.getDirectorId());
					                }
			                    }
		                        String directorIds = String.join("," , directorIdList);
			                    recommendmovieDto.setDirectorIds(directorIds); 
			                    movieDto.setDirectorIds(directorIds);
			                }
			                
			                //배우
			                if (actorsNode != null && actorsNode.isArray() && actorsNode.size() > 0) {
			                   List<String> actorNmList = new ArrayList<>();
			                   
			                   for (JsonNode actorNode : actorsNode) {
			                	   String actorNm = actorNode.get("actorNm").asText();
			                	   actorNmList.add(actorNm);
			                	   
			                	   //배우 db 저장
			                	    MovieActorsDto movieActorsDto = objectMapper.treeToValue(actorNode, MovieActorsDto.class);
				                    if (!apiDao.existsActorById(movieActorsDto.getActorId())) {
					                    apiDao.saveActors(movieActorsDto);
					                } else {
					                    log.info("배우 정보가 이미 존재합니다. directorId: {}", movieActorsDto.getActorId());
					                }
			                   }
			                   String actorNms = String.join(",", actorNmList);
			                   recommendmovieDto.setActorNms(actorNms);
			                   movieDto.setActorNms(actorNms);
			                }
			                
			                // 줄거리
			                if (plotsNode != null && plotsNode.isArray() && plotsNode.size() > 0) {
			                    JsonNode plotTextNode = plotsNode.get(0).get("plotText");
			                    if (plotTextNode != null) {
			                        String plotText = plotTextNode.asText();
			                        recommendmovieDto.setPlotText(plotText);
			                        movieDto.setPlotText(plotText);
			                    }
			                }
		
			                // 포스터
			                if (posterNode != null && posterNode.isTextual()) {
			                    String posterData = posterNode.asText();
			                    String[] posterUrls = posterData.split("\\|"); // |를 기준으로 분리
		
			                    if (posterUrls.length > 0) {
			                        String firstPosterUrl = posterUrls[0];
			                        recommendmovieDto.setPoster(firstPosterUrl);
			                        movieDto.setPoster(firstPosterUrl);
			                        
			                    }
			                }
			                //수상내역
			                if (awardsNode != null && awardsNode.isTextual()) {
			                	String awards1 = awardsNode.asText();
			                	recommendmovieDto.setAwards1(awards1);
			                    movieDto.setAwards1(awards1);
			                }
		
			                apiDao.save(movieDto);
			                apiDao.saveRecommendMovie(recommendmovieDto);
		
			            } catch (IOException e) {
			                log.error("movieSeq: {}에 대한 JSON 응답 파싱 중 오류 발생", movieSeq, e);
			            }
			        }
			    }



           //개봉 예정 영화
			@Override
			public void releaseSoonMovies() {
				   log.info("영화 API 호출");
				   String movieId = "F";
				   List<String> soonmovieSeqs = Arrays.asList("59056");
					
				   
			        for (String movieSeq : soonmovieSeqs) {
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
			                
			                
			                ReleaseSoonMovieDto releasesoonmovieDto = objectMapper.treeToValue(resultNode, ReleaseSoonMovieDto.class);
			                
			                
			                //감독
			                if (directorsNode != null && directorsNode.isArray() && directorsNode.size() > 0) {
			                    List<String> directorIdList = new ArrayList<>();
		
			                    for (JsonNode directorNode : directorsNode) {
			                        String directorId = directorNode.get("directorId").asText();
			                        directorIdList.add(directorId);
			                        
			                        //감독 db 저장
			                        MovieDirectorsDto movieDirectorsDto = objectMapper.treeToValue(directorNode, MovieDirectorsDto.class);
				                    if (!apiDao.existsDirectorById(movieDirectorsDto.getDirectorId())) {
					                    apiDao.saveDirectors(movieDirectorsDto);
					                } else {
					                    log.info("감독 정보가 이미 존재합니다. directorId: {}", movieDirectorsDto.getDirectorId());
					                }
			                    }
		                        String directorIds = String.join("," , directorIdList);
		                        releasesoonmovieDto.setDirectorIds(directorIds); 
			                }
			                
			                //배우
			                if (actorsNode != null && actorsNode.isArray() && actorsNode.size() > 0) {
			                   List<String> actorNmList = new ArrayList<>();
			                   
			                   for (JsonNode actorNode : actorsNode) {
			                	   String actorNm = actorNode.get("actorNm").asText();
			                	   actorNmList.add(actorNm);
			                	   
			                	   //배우 db 저장
			                	    MovieActorsDto movieActorsDto = objectMapper.treeToValue(actorNode, MovieActorsDto.class);
				                    if (!apiDao.existsActorById(movieActorsDto.getActorId())) {
					                    apiDao.saveActors(movieActorsDto);
					                } else {
					                    log.info("배우 정보가 이미 존재합니다. directorId: {}", movieActorsDto.getActorId());
					                }
			                   }
			                   String actorNms = String.join(",", actorNmList);
			                   releasesoonmovieDto.setActorNms(actorNms);
			                }
			                
			                // 줄거리
			                if (plotsNode != null && plotsNode.isArray() && plotsNode.size() > 0) {
			                    JsonNode plotTextNode = plotsNode.get(0).get("plotText");
			                    if (plotTextNode != null) {
			                        String plotText = plotTextNode.asText();
			                        releasesoonmovieDto.setPlotText(plotText);
			                    }
			                }
		
			                // 포스터
			                if (posterNode != null && posterNode.isTextual()) {
			                    String posterData = posterNode.asText();
			                    String[] posterUrls = posterData.split("\\|"); // |를 기준으로 분리
		
			                    if (posterUrls.length > 0) {
			                        String firstPosterUrl = posterUrls[0];
			                        releasesoonmovieDto.setPoster(firstPosterUrl);
			                    }
			                }
			                //수상내역
			                if (awardsNode != null && awardsNode.isTextual()) {
			                	String awards1 = awardsNode.asText();
			                	releasesoonmovieDto.setAwards1(awards1);
			                }
		
			                apiDao.saveReleaseSoonMovie(releasesoonmovieDto);
		
			            } catch (IOException e) {
			                log.error("movieSeq: {}에 대한 JSON 응답 파싱 중 오류 발생", movieSeq, e);
			            }
			        }
           }
	}