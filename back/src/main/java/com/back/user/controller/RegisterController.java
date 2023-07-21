package com.back.user.controller;

import java.util.Collections;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.back.user.repository.RegisterDto;
import com.back.user.service.RegisterService;
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
	@GetMapping("/idCheck")
	public Boolean idCheck(@RequestParam(name = "userId") String userId) {
		log.info("idCheck 확인");
		 boolean result = registerService.idCheck(userId);
		 return result;
	}
	
	//회원가입
	@PostMapping("/userJoin")
	public int userJoin(@RequestBody RegisterDto rDto) {
		log.info("memberInsert 확인");
		int result = registerService.userJoin(rDto);
		return result;
	}
	
	

	
}