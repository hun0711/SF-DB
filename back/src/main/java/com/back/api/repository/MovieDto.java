package com.back.api.repository;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class MovieDto {

	private int movieId; //pk
	private String movieTitle; //제목
	private String movieOrignTitle; //원제
	private String movieOverview; //줄거리
	private String movieNation;  //국가
	private int movieRuntime; //상영시간
	private String movieRating; //등급
	private String movieTagline; //태그라인
	private String movieReleaseDate; //개봉일
	private String movieScore; //평점
	private String moviePoster; //포스터
	
	
	
}
