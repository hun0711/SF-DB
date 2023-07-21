package com.back.user.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.back.user.repository.RegisterDto;
import com.back.user.service.LoginService;
import com.back.user.service.RegisterService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@ResponseBody
@CrossOrigin("http://localhost:3000")
@RequestMapping("/user")
@RequiredArgsConstructor
@Slf4j
public class LoginController {
	private final LoginService loginService;

	
	//로그인
	@PostMapping("/login")
	public int userLogin(@RequestBody RegisterDto rDto) {
		log.info("유저 로그인 호출");
		int result = loginService.userLogin(rDto);
		return result;
	}
}
