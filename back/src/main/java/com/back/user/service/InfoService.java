package com.back.user.service;

import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public interface InfoService {


	int changeUserName(Map<String, String> requestData);

	int updateProfileImage(Map<String, String> requestData);

	String findIdByUserNameAndEmail(Map<String, String> userData);

	String findPwByUserNameAndIdAndEmail(Map<String, String> userData);

	void updateUserPassword(String userId, String encodedPassword);

	String getEncryptedPassword(String userId);


}
