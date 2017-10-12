/* Copyright (C) 2017 Nate Bever - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Apache 2.0 license.
 *
 * You should have received a copy of the Apache 2.0 license with
 * this file. If not, please write to: bever.nate@gmail.com, 
 * or visit: https://github.com/nbever/bic/LICENSE.md
 */
package com.wizardfingers.bic.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonProperty;

public class User extends BaseObject{

	private String firstName;
	private String lastName;
	private String middleName;
	private Date birthday;
	private String schoolId;
	private String email;
	private String token;
	private Integer graduatingClass;
	private ROLE role;
	private Date lastLogin;
	private String username;
	
	@JsonProperty
	public String getFirstName() {
		return firstName;
	}
	
	@JsonProperty
	public String getLastName() {
		return lastName;
	}
	
	@JsonProperty
	public String getMiddleName() {
		return middleName;
	}
	
	@JsonProperty
	public Date getBirthday() {
		return birthday;
	}
	
	@JsonProperty
	public String getEmail() {
		return email;
	}
	
	@JsonProperty
	public String getToken() {
		return token;
	}
	
	@JsonProperty
	public Integer getGraduatingClass() {
		return graduatingClass;
	}
	
	@JsonProperty
	public String getSchoolId() {
		return schoolId;
	}
	
	@JsonProperty
	public ROLE getRole() {
		return role;
	}
	
	@JsonProperty
	public Date getLastLogin() {
		return lastLogin;
	}
	
	@JsonProperty
	public String getUsername() {
		return username;
	}
}
