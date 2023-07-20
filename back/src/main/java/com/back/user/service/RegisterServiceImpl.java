package com.back.user.service;

import org.springframework.stereotype.Service;

import com.back.user.repository.RegisterDao;
import com.back.user.repository.RegisterDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Service
@RequiredArgsConstructor
@Slf4j
public class RegisterServiceImpl implements RegisterService {
	
private final RegisterDao registerDao;

	
	//id 중복확인
	@Override
	public boolean idCheck(String userId) {
		log.info("id중복확인");
		return registerDao.idCheck(userId);
	}
	
	
	//회원가입
	@Override
	public int userJoin(RegisterDto rDto) {
		log.info("userJoin 확인");
        int	result = registerDao.userJoin(rDto);
		return result;
	}

}
