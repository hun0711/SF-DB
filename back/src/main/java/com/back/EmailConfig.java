package com.back;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

@Configuration
public class EmailConfig {

	   @Value("${spring.mail.host}")
	    private String host;

	    @Value("${spring.mail.port}")
	    private int port;

	    @Value("${spring.mail.username}")
	    private String username;

	    @Value("${spring.mail.password}")
	    private String password;
	
    @Bean
    public JavaMailSender javaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost(host);
        mailSender.setPort(port); // SMTP 포트 번호
        mailSender.setUsername(username); // 이메일 계정
        mailSender.setPassword(password); // 이메일 비밀번호
        
        freemarker.template.Configuration configuration = new freemarker.template.Configuration(freemarker.template.Configuration.VERSION_2_3_31);
        configuration.setClassForTemplateLoading(this.getClass(), "/templates");

        return mailSender;
    }
}
