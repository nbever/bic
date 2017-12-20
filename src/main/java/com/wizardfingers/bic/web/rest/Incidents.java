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
import com.wizardfingers.bic.model.Incident;
import com.wizardfingers.bic.model.ROLE;
import com.wizardfingers.bic.services.IncidentAPI;
import com.wizardfingers.bic.web.auth.BICAuth;

/**
 * @author us
 *
 */
@Path("/incidents")
@Produces(MediaType.APPLICATION_JSON)
public class Incidents {

	private IncidentAPI incidentApi;
	
	public Incidents(IncidentAPI api) {
		this.incidentApi = api;
	}
	
	@BICAuth(ROLE.TEACHER)
	@GET
	@Timed
	public List<Incident> getIncidents() {
		List<Incident> incidents = getIncidentApi().get();
		return incidents;
	}
	
	@BICAuth(ROLE.TEACHER)
	@POST
	public Response createIncident(Incident incident) {
		
		String incidentId = getIncidentApi().save(incident);
		Response r = Response.status(Response.Status.OK).type(MediaType.TEXT_PLAIN).entity(incidentId).build();
		return r;
	}
	
	private IncidentAPI getIncidentApi() {
		return this.incidentApi;
	}
}
