package com.back.api.repository;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MovieDao {

	void saveMovie(MovieDto movieDto);


}
