package com.back.user.service;

import org.springframework.stereotype.Service;
import com.back.user.repository.RegisterRepository;
import com.back.user.repository.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Service
@RequiredArgsConstructor
@Slf4j
public class RegisterServiceImpl implements RegisterService {
	
private final RegisterRepository registerRepository;

	
	//id 중복확인
	@Override
	public boolean idCheck(String userId) {
		log.info("id중복확인");
		return registerRepository.idCheck(userId);
	}
	
	
	//회원가입
	@Override
	public User userJoin(User user) {
		log.info("userJoin 확인");
		User result;
		result = registerRepository.save(user);
		return result;
	}

}
