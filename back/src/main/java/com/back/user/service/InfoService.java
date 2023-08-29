package com.back.user.service;

import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public interface InfoService {


	int changeUserName(Map<String, String> requestData);


}
