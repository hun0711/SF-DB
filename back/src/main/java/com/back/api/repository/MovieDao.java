package com.back.api.repository;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MovieDao {

    //영화 정보 저장
	void save(MovieDto movieDto);


	//감독 중복 확인
	boolean existsDirectorById(String directorId);
	
	//감독 정보 저장
	void saveDirectors(MovieDirectorsDto movieDirectorsDto);

	

	//배우 중복 확인
	boolean existsActorById(String actorId);

	//배우 정보 저장
	void saveActors(MovieActorsDto movieActorsDto);




}
