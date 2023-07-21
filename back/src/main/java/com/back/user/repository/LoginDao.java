package com.back.user.repository;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LoginDao {

	//로그인
	public int userLogin(UserDto uDto);
}