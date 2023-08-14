package com.back.movie.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.back.api.repository.MovieDto;
import com.back.api.repository.RecommendMovieDto;
import com.back.api.repository.ReleaseSoonMovieDto;
import com.back.api.repository.Top20SfMovieDto;

@Mapper
public interface MovieDao {

	//영화 조회 (Top 20 , 추천)
	List<MovieDto> movieList();

	//영화 정보 조건 검색 (top20 , 추천)
	List<MovieDto> selectMovie(MovieDto mDto);

	//영화 정보 상세보기
	List<MovieDto> movieDetail(MovieDto mDto);

	//TOP 20 영화
	List<Top20SfMovieDto> top20SfMovie();

    //추천 영화
	List<RecommendMovieDto> recommendMovie();

	//개봉 예정 영화
	List<ReleaseSoonMovieDto> releaseSoonMovie();

}
