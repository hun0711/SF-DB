package com.back.movie.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.back.api.repository.MovieDto;
import com.back.api.repository.RecommendMovieDto;
import com.back.api.repository.ReleaseSoonMovieDto;
import com.back.api.repository.Top20SfMovieDto;

@Service
public interface MovieService {

	/******** 영화 정보 전체조회 (top20 , 추천) ********/
	List<MovieDto> movieList();

	/******** 영화 정보 조건검색 (top20 , 추천) ********/
	List<MovieDto> selectMovie(MovieDto mDto);

	/******** 영화 정보 상세보기 ********/
	List<MovieDto> movieDetail(MovieDto mDto);

	/******** Top 20 영화  ********/
	List<Top20SfMovieDto> top20SfMovie();

	/*********** 추천 영화 ***********/
	List<RecommendMovieDto> recommendMovie();

	/********** 개봉 예정 영화 ********/
	List<ReleaseSoonMovieDto> releaseSoonMovie();

}
