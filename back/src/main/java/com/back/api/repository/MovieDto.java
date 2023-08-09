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
	private int movieProdYear; //제작연도
	private String movieDirectors; //감독
	private String movieActors; //배우
	private String movieNation;  //국가
	private String moviePlots; //줄거리
	private int movieRuntime; //상영시간
	private String movieRating; //등급
	private String movieRepRlsDate; //개봉일
	private String moviePosters; //포스터
	
	
	
}
