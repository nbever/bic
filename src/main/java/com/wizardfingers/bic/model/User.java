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
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.wizardfingers.bic.model.serializers.JsonDateDeserializer;
import com.wizardfingers.bic.model.serializers.JsonDateSerializer;

public class User extends BaseObject{

	private String firstName;
	private String lastName;
	private String middleName;
	private Date birthday;
	private String schoolId;
	private String email;
	private String token;
	private ROLE role;
	private Date lastLogin;
	private String username;
	
	protected User() {
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
	public User(String firstName, String lastName, String middleName, Date birthday, String schoolId, String email,
			String token, ROLE role, String username) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.middleName = middleName;
		this.birthday = birthday;
		this.schoolId = schoolId;
		this.email = email;
		this.token = token;
		this.role = role;
		this.username = username;
	}

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
	
	@JsonSerialize(using=JsonDateSerializer.class)
	@JsonDeserialize(using=JsonDateDeserializer.class)
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
	public String getSchoolId() {
		return schoolId;
	}
	
	@JsonProperty
	public ROLE getRole() {
		return role;
	}
	
	@JsonSerialize(using=JsonDateSerializer.class)
	@JsonDeserialize(using=JsonDateDeserializer.class)
	@JsonProperty
	public Date getLastLogin() {
		return lastLogin;
	}
	
	@JsonProperty
	public String getUsername() {
		return username;
	}
}
