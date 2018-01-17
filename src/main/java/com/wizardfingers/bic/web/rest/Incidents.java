/* Copyright (C) 2017 Nate Bever - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Apache 2.0 license.
 *
 * You should have received a copy of the Apache 2.0 license with
 * this file. If not, please write to: bever.nate@gmail.com, 
 * or visit: https://github.com/nbever/bic/LICENSE.md
 */
package com.wizardfingers.bic.web.rest;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.codahale.metrics.annotation.Timed;
import com.wizardfingers.bic.model.Incident;
import com.wizardfingers.bic.model.ROLE;
import com.wizardfingers.bic.services.IncidentAPI;
import com.wizardfingers.bic.web.auth.BICAuth;
import com.wizardfingers.bic.model.INCIDENT_STATE;

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
	public List<Incident> getIncidents(
		@QueryParam("from") String fromDateStr,
		@QueryParam("to") String toDateStr,
		@QueryParam("states") String statesStr,
		@QueryParam("dateTypes") String dateTypesStr) throws ParseException {
		
		String datePattern = "MM/dd/yyyy HH:mm a";
		SimpleDateFormat sdf = new SimpleDateFormat(datePattern);
		
		Date from = new Date(0);
		Date to = new Date();
		List<String> states = Arrays.asList(INCIDENT_STATE.WAITING_ADMINISTRATION.name(),
			INCIDENT_STATE.PENDING_RESTITUTION.name(),
			INCIDENT_STATE.PENDING_REFLECTION.name(),
			INCIDENT_STATE.COMPLETED.name());
		List<String> dateTypes = Arrays.asList("incident", "administer", "complete");
		
		if ( fromDateStr != null ) {
			from = sdf.parse(fromDateStr.trim());
		}
		
		if ( toDateStr != null ) {
			to = sdf.parse(toDateStr.trim());
		}
		
		if ( statesStr != null ) {
			states = Arrays.asList(statesStr.trim().split(","));
		}
		
		if ( dateTypes != null ) {
			dateTypes = Arrays.asList(dateTypesStr.trim().split(","));
		}
		
		List<Incident> incidents = getIncidentApi().get(from, to, states, dateTypes);
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
