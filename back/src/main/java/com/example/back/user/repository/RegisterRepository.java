package com.example.back.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegisterRepository extends JpaRepository<User , String> {
	
	//id 중복확인
	boolean idCheck(String userId);

	// 이메일로 사용자 조회
    User findByEmail(String userEmail);
	
	//회원 가입 -- !정의할 필요 없이 자동처리됨
	User save(User user);


    //회원 정보 수정
}
