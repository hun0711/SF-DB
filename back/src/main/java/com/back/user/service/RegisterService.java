package com.back.user.service;

import org.springframework.stereotype.Service;

import com.back.user.repository.RegisterDto;

@Service
public interface RegisterService {
	
     	//id 중복확인
		boolean idCheck(String userId);

		//회원 가입
		int userJoin(RegisterDto rDto);

}
