package com.back.user.repository;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface RegisterDao {
	
	//id 중복체크
	public boolean idCheck(String userId);
	

	// 회원 가입
    public int userJoin(RegisterDto rDto);


}
