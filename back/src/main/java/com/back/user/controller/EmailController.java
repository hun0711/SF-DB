package com.back.user.controller;

import java.io.IOException;
import java.time.Duration;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.back.user.repository.UserDto;
import com.back.user.service.EmailService;
import com.back.user.service.InfoService;

import freemarker.core.ParseException;
import freemarker.template.Configuration;
import freemarker.template.MalformedTemplateNameException;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import freemarker.template.TemplateNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@ResponseBody
@CrossOrigin("http://localhost:3000")
@RequestMapping("/user")
@RequiredArgsConstructor
@Slf4j
public class EmailController {
	private final InfoService infoService;
	private final EmailService emailService;
    private final JavaMailSender javaMailSender;
    private final TaskScheduler taskScheduler;
    private final Configuration freemarkerConfig;
    

    @GetMapping("/existReleaseNoticeEmailUser")
    public Boolean existReleaseNoticeEmailUser(@RequestParam(name = "userId") String userId) {
    	log.info("EmailController : existReleaseNoticeEmailUser 호출");
    	boolean result = emailService.existReleaseNoticeEmailUser(userId);
    	return result;
    }
    
    
    @PostMapping("/releaseNoticeEmail")
    public int releaseNoticeEmail(@RequestBody Map<String, String> requestData) throws TemplateNotFoundException, MalformedTemplateNameException, ParseException, IOException {
        log.info("EmailController : releaseNoticeEmail 호출");
        try {
            String repRlsDateString = requestData.get("repRlsDate");
            LocalDate repRlsDate = LocalDate.parse(repRlsDateString, DateTimeFormatter.ISO_DATE);
            String userEmail = requestData.get("userEmail");
            String title = requestData.get("title");
            String posterUrls = requestData.get("posterUrls");
            String actorNms = requestData.get("actorNms");
            String plotText = requestData.get("plotText");

            // 메일 내용 생성
            String mailSubject = "[SFDB] 영화 " + title + " 개봉 알림";
            Template template = freemarkerConfig.getTemplate("releaseNoticeEmail.html");
            Map<String, Object> model = new HashMap<>();
            model.put("title", title);
            model.put("actorNms", actorNms);
            model.put("plotText", plotText);
            model.put("posterUrls", posterUrls);
            String htmlContent = FreeMarkerTemplateUtils.processTemplateIntoString(template, model);

            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
            helper.setTo(userEmail);
            helper.setSubject(mailSubject);
            helper.setText(htmlContent, true);

            // 메일 전송
            LocalDateTime scheduledTime = LocalDateTime.of(repRlsDate, LocalTime.of(12, 0)); // 예약하려는 시간 (예: 8시)
            Instant instant = scheduledTime.atZone(ZoneId.systemDefault()).toInstant();
            taskScheduler.schedule(() -> javaMailSender.send(mimeMessage), new Date(instant.toEpochMilli()));
            int result = emailService.releaseNoticeEmail(requestData);
            return result;

        } catch (MessagingException | TemplateException e) {
            e.printStackTrace();
            return 0;
        }
    }
    
    
    //id찾기
    @PostMapping("/findId")
    public int findId(@RequestBody Map<String, String> userData) throws TemplateNotFoundException, MalformedTemplateNameException, ParseException, IOException {
    	  log.info("EmailController : findId 호출");
          try {
              UserDto uDto = new UserDto();
              String userId = infoService.findIdByUserNameAndEmail(userData);
              
              String userName = userData.get("userName");
              String userEmail = userData.get("userEmail");
              
              if (userId != null) {
                  // userId가 존재하면 메일 발송
                  String mailSubject = "[SFDB] 회원님의 아이디 찾기 결과입니다.";
                  Template template = freemarkerConfig.getTemplate("findId.html");
                  Map<String, Object> model = new HashMap<>();
                  model.put("userName", userName);
                  model.put("userId", userId);
                  String htmlContent = FreeMarkerTemplateUtils.processTemplateIntoString(template, model);

                  MimeMessage mimeMessage = javaMailSender.createMimeMessage();
                  MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
                  helper.setTo(userEmail);
                  helper.setSubject(mailSubject);
                  helper.setText(htmlContent, true);

                  // 메일 전송
                  javaMailSender.send(mimeMessage);

                  return 1;
              } else {
                  // userId가 존재하지 않으면 0 반환
                  return 0;
              }
          } catch (MessagingException | TemplateException e) {
              e.printStackTrace();
              return 0;
          }

    }
    
    //pw찾기
    @PostMapping("/findPw")
    public int findPw(@RequestBody Map<String, String> userData) throws TemplateNotFoundException, MalformedTemplateNameException, ParseException, IOException {
    	log.info("EmailController : findPw 호출");
    	try {
    		UserDto uDto = new UserDto();
    		String userPw = infoService.findPwByUserNameAndIdAndEmail(userData);
    		
    		String userId = userData.get("userId");
    		String userName = userData.get("userName");
    		String userEmail = userData.get("userEmail");
    		
    		if (userPw != null) {
    			// userPw가 존재하면 메일 발송
    			String mailSubject = "[SFDB] 회원님의 비밀번호 찾기 결과입니다.";
    			Template template = freemarkerConfig.getTemplate("findPw.html");
    			Map<String, Object> model = new HashMap<>();
    			model.put("userName", userName);
    			model.put("userId", userId);
    			model.put("userPw", userPw);
    			String htmlContent = FreeMarkerTemplateUtils.processTemplateIntoString(template, model);
    			
    			MimeMessage mimeMessage = javaMailSender.createMimeMessage();
    			MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
    			helper.setTo(userEmail);
    			helper.setSubject(mailSubject);
    			helper.setText(htmlContent, true);
    			
    			// 메일 전송
    			javaMailSender.send(mimeMessage);
    			
    			return 1;
    		} else {
    			// userPw가 존재하지 않으면 0 반환
    			return 0;
    		}
    	} catch (MessagingException | TemplateException e) {
    		e.printStackTrace();
    		return 0;
    	}
    	
    }
    


}
