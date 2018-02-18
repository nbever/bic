/* Copyright (C) 2017 Nate Bever - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Apache 2.0 license.
 *
 * You should have received a copy of the Apache 2.0 license with
 * this file. If not, please write to: bever.nate@gmail.com, 
 * or visit: https://github.com/nbever/bic/LICENSE.md
 */
package com.wizardfingers.bic.web.rest;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.apache.http.client.HttpResponseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.codahale.metrics.annotation.Timed;
import com.wizardfingers.bic.model.ROLE;
import com.wizardfingers.bic.model.User;
import com.wizardfingers.bic.model.config.ModeConfig;
import com.wizardfingers.bic.services.UserAPI;
import com.wizardfingers.bic.web.auth.BICAuth;
import com.wizardfingers.bic.web.filters.AuthorizationFilter;

/**
 * @author us
 *
 */
@Path("/config")
@Produces(MediaType.APPLICATION_JSON)
public class Configuration {

	final static Logger logger = LoggerFactory.getLogger(Configuration.class);
	private ModeConfig modeConfiguration;
	private UserAPI userApi;
	
	public Configuration( ModeConfig modeConfiguration, UserAPI userApi ) {
		this.modeConfiguration = modeConfiguration;
		this.userApi = userApi;
	}
	
	@BICAuth(ROLE.OPEN)
	@GET
	@Timed
	@Path("operating_mode")
	public ModeConfig getModeConfiguration() {
		return this.modeConfiguration;
	}
	
	@BICAuth(ROLE.OPEN)
	@POST
	@Timed
	@Path("impersonate/{id}")
	public User impersonate( @Context HttpServletResponse response, @PathParam("id") String id) throws HttpResponseException {
		
		if ( !getModeConfiguration().getMode().equals(ModeConfig.MODE.OPEN) ) {
		  throw new HttpResponseException(Response.Status.FORBIDDEN.getStatusCode(), "This method is not allowed while running in closed mode.");
		}
		
		User user = this.getUserApi().getUserById(id);
		logger.warn("Setting user to: " + user.getEmail());
		getModeConfiguration().setEmail( user.getEmail());
		
		return user;
	}
	
	private UserAPI getUserApi() {
		return this.userApi;
	}
}
