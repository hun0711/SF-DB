package com.back.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.back.user.repository.User;


@Repository
public interface RegisterRepository extends JpaRepository<User , String>{
	
	//id 중복확인
	@Query("SELECT COUNT(u) > 0 FROM User u WHERE u.userId = :userId")
	boolean idCheck(@Param("userId") String userId);

	// 이메일로 사용자 조회
    //User findByEmail(String userEmail);
	
	//회원 가입 -- !정의할 필요 없이 자동처리됨
	User save(User user);


    //회원 정보 수정

}
