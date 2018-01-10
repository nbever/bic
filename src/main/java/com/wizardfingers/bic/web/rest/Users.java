/* Copyright (C) 2017 Nate Bever - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Apache 2.0 license.
 *
 * You should have received a copy of the Apache 2.0 license with
 * this file. If not, please write to: bever.nate@gmail.com, 
 * or visit: https://github.com/nbever/bic/LICENSE.md
 */
package com.wizardfingers.bic.web.rest;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.codahale.metrics.annotation.Timed;
import com.wizardfingers.bic.model.ROLE;
import com.wizardfingers.bic.web.auth.BICAuth;
import com.wizardfingers.bic.model.User;
import com.wizardfingers.bic.services.UserAPI;

/**
 * @author us
 *
 */
@Path("/users")
@Produces(MediaType.APPLICATION_JSON)
public class Users {
	
	private UserAPI userApi;
	
	public Users( UserAPI userApi ) {
		this.userApi = userApi;
	}

	@BICAuth(ROLE.ADMIN)
	@GET
	@Timed
	public List<User> getUsers() {
		List<User> users = getUserApi().getUsers();
		
		return users;
	}
	
	private UserAPI getUserApi() {
		return userApi;
	}
}
