package com.back.user.repository;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface InfoDao {


	public int changeUserName(Map<String, String> requestData);

	public int updateProfileImage(Map<String, String> requestData);

	public String findIdByUserNameAndEmail(Map<String, String> userData);

	public String findPwByUserNameAndIdAndEmail(Map<String, String> userData);


}
