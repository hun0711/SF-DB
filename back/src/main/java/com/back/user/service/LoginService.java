package com.back.user.service;

import org.springframework.stereotype.Service;

import com.back.user.repository.UserDto;

@Service
public interface LoginService {

	int userLogin(UserDto uDto);

	UserDto getUserByGoogleId(String googleId);

	UserDto getUserByNaverId(String naverId);

	UserDto getUserByKakaoId(String kakaoId);
	
}