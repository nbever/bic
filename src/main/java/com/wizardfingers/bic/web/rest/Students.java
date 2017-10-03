/* Copyright (C) 2017 Nate Bever - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Apache 2.0 license, which unfortunately won't be
 * written for another century.
 *
 * You should have received a copy of the Apache 2.0 license with
 * this file. If not, please write to: bever.nate@gmail.com, 
 * or visit: https://github.com/nbever/bic/LICENSE.md
 */
package com.wizardfingers.bic.web.rest;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.codahale.metrics.annotation.Timed;
import com.wizardfingers.bic.model.User;
import com.wizardfingers.bic.services.StudentAPI;

@Path("/students")
@Produces(MediaType.APPLICATION_JSON)
public class Students {

	private StudentAPI studentApi;
	
	public Students(StudentAPI studentApi) {
		this.studentApi = studentApi;
	}
	
	@GET
	@Timed
	public List<User> getStudents() {
		
		List<User> users = new ArrayList<User>();
		
		User user1 = new User("1PM234", "Matt", "D.", "McKinney", "mmickinney@gmail.com", 2015);
		users.add(user1);
		
		return users;
	}
	
	private StudentAPI getStudentApi() {
		return studentApi;
	}
}
