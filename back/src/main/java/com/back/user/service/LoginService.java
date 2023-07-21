package com.back.user.service;

import org.springframework.stereotype.Service;

import com.back.user.repository.RegisterDto;

@Service
public interface LoginService {

	int userLogin(RegisterDto rDto);

	
}
