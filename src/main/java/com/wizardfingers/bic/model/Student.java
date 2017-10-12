package com.wizardfingers.bic.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Student extends User{

	@JsonProperty
	public ROLE getRole() {
		return ROLE.STUDENT;
	}
}
