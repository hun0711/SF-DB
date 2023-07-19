package com.example.back.user.service;

import java.util.Map;

import org.springframework.stereotype.Service;

import com.example.back.user.repository.User;

@Service
public interface RegisterService {
	
	//id 중복확인
	boolean idCheck(String userId);

	//회원 가입
	User userJoin(User user);

}
