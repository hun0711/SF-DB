package com.back.user.repository;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "user")
public class User {
	
	@Id
	private int userNo;
	private String userId;
	private String userPw;
	private String userName;
	private String userBirth;
	private String userEmail;
	
	

}
