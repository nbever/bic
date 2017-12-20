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
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.codahale.metrics.annotation.Timed;
import com.wizardfingers.bic.model.Discipline;
import com.wizardfingers.bic.model.ROLE;
import com.wizardfingers.bic.services.DisciplineConfigAPI;
import com.wizardfingers.bic.web.auth.BICAuth;

/**
 * @author us
 *
 */
@Path("/discipline")
@Produces(MediaType.APPLICATION_JSON)
public class Disciplines {

	private DisciplineConfigAPI disciplineApi;
	
	public Disciplines(DisciplineConfigAPI api) {
		this.disciplineApi = api;
	}
	
	@BICAuth(ROLE.ADMIN)
	@GET
	@Timed
	public List<Discipline> getDisciplines() {
		
		List<Discipline> disciplines = getDisciplineApi().get();
		return disciplines;
	}
	
	@BICAuth(ROLE.ADMIN)
	@POST
	@Timed
	public Response createDiscipline(Discipline discipline) {
		
		String objectId = getDisciplineApi().save(discipline);
		
		return Response.status(Response.Status.OK).type("text/plain").entity(objectId).build();
	}
	
	private DisciplineConfigAPI getDisciplineApi() {
		return this.disciplineApi;
	}
}
