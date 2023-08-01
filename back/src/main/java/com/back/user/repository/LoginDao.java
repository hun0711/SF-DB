package com.back.user.repository;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LoginDao {

	//로그인
	public int userLogin(UserDto uDto);
	
	//구글 회원 존재여부 확인
	public UserDto findByGoogleId(String googleId);

	//네이버 회원 존재여부 확인
	public UserDto findByNaverId(String naverId);

	//카카오 회원 존재여부 확인
	public UserDto findByKakaoId(String kakaoId);
}