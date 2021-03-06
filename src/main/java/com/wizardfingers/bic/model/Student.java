package com.wizardfingers.bic.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Student extends User{

	protected Student(){
		super();
	}
	
	/**
	 * @param firstName
	 * @param lastName
	 * @param middleName
	 * @param birthday
	 * @param schoolId
	 * @param email
	 * @param token
	 * @param role
	 * @param username
	 */
	public Student(String firstName, String lastName, String middleName, Long birthday, String schoolId, String email,
			String token, ROLE role, String username, Integer graduatingClass) {
		
		super(firstName, lastName, middleName, birthday, schoolId, email, token, role, username);
		this.graduatingClass = graduatingClass;
	}

	private Integer graduatingClass;
	
	@JsonProperty
	public ROLE getRole() {
		return ROLE.STUDENT;
	}
	
	@JsonProperty
	public Integer getGraduatingClass() {
		return graduatingClass;
	}
	
}
