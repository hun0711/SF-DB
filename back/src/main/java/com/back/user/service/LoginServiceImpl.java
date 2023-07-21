package com.back.user.service;

import org.springframework.stereotype.Service;

import com.back.user.repository.LoginDao;
import com.back.user.repository.RegisterDao;
import com.back.user.repository.RegisterDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class LoginServiceImpl implements LoginService {

	private final LoginDao loginDao;

	@Override
	public int userLogin(RegisterDto rDto) {
		log.info("유저로그인 호출");
		int result = loginDao.userLogin(rDto);
		return result;
	}

}
