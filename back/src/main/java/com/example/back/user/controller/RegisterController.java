package com.example.back.user.controller;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.back.user.repository.User;
import com.example.back.user.service.RegisterService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@ResponseBody
@CrossOrigin("http://localhost:3000")
@RequestMapping("/register/*")
@RequiredArgsConstructor
@Slf4j
public class RegisterController {
  
	private final RegisterService registerService;
	
	//ID 중복확인
	@GetMapping("idCheck")
	public boolean idCheck(@RequestParam("userId") String userId) {
		 return registerService.idCheck(userId);
	}
	
	//회원가입
	@PostMapping("userJoin")
	public User userJoin(@RequestBody User user) {
		log.info("memberInsert 확인");
		User result = registerService.userJoin(user);
		return result;
	}
	
	

	
}
