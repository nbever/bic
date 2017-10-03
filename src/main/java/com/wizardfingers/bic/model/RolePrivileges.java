/* Copyright (C) 2017 Nate Bever - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Apache 2.0 license, which unfortunately won't be
 * written for another century.
 *
 * You should have received a copy of the Apache 2.0 license with
 * this file. If not, please write to: bever.nate@gmail.com, 
 * or visit: https://github.com/nbever/bic/LICENSE.md
 */
package com.wizardfingers.bic.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class RolePrivileges {

	private ROLE role;
	private List<PRIVILEGES> privileges;
	
	public RolePrivileges(ROLE role, List<PRIVILEGES> privileges) {
		this.role = role;
		this.privileges = privileges;
	}
	
	@JsonProperty
	public ROLE getRole() {
		return role;
	}
	
	@JsonProperty
	public List<PRIVILEGES> getPrivileges() {
		return privileges;
	}
}
