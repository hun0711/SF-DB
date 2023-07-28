package com.back.user.controller;

import java.util.Map;

import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.back.user.repository.UserDto;
import com.back.user.service.LoginService;

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
	public int userLogin(@RequestBody UserDto uDto) {
		log.info("유저 로그인 호출");
		int result = loginService.userLogin(uDto);
		return result;
	}
	
	
	//구글로그인
	@PostMapping("/login/google")
	public int googleSocialLogin(@RequestBody Map<String, String> googleLoginData, HttpServletRequest request) {
		  log.info("구글 소셜 로그인 호출");
	        // 구글 로그인 데이터에서 tokenId 추출
	        String tokenId = googleLoginData.get("tokenId");
	        try {

	            // 로그인 성공 시, 사용자 인증 처리 (예시: 세션 사용)
	            HttpSession session = request.getSession(true);
	            session.setAttribute("userId", googleLoginData.get("email"));
	            // 로그인 성공에 대한 응답
	            return 1;
	        } catch (Exception e) {
	            // 로그인 실패에 대한 처리
	            log.error("구글 소셜 로그인 실패:", e);
	            return 0;
	        }
	}
	
	//네이버로그인
	@PostMapping("/login/naver")
	public int naverSocialLogin(@RequestBody Map<String, String> naverLoginData, HttpServletRequest request) {
		log.info("네이버 소셜 로그인 호출");
		String userId = naverLoginData.get("id");
	    String userEmail = naverLoginData.get("email");
	    String userName = naverLoginData.get("nickname");
	    String userProfileImage = naverLoginData.get("profileImage");
	    try {
            // 로그인 성공 시, 사용자 인증 처리 (예시: 세션 사용)
            HttpSession session = request.getSession(true);
            session.setAttribute("userId", userId);

			/*
			 * // 네이버 로그인 데이터를 UserDto에 담아서 서비스로 전달 UserDto naverUser = new UserDto(userId,
			 * userEmail, userName, userProfileImage); int result =
			 * loginService.userLogin(naverUser);
			 */

            // 로그인 성공에 대한 응답
            return 1;
        } catch (Exception e) {
            // 로그인 실패에 대한 처리
            log.error("네이버 소셜 로그인 실패:", e);
            return 0;
        }
    }
	}
	
	