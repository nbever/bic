/* Copyright (C) 2017 Nate Bever - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Apache 2.0 license.
 *
 * You should have received a copy of the Apache 2.0 license with
 * this file. If not, please write to: bever.nate@gmail.com, 
 * or visit: https://github.com/nbever/bic/LICENSE.md
 */
package com.wizardfingers.bic.web.rest;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.codahale.metrics.annotation.Timed;
import com.wizardfingers.bic.model.ROLE;
import com.wizardfingers.bic.model.config.ModeConfig;
import com.wizardfingers.bic.web.auth.BICAuth;

/**
 * @author us
 *
 */
@Path("/config")
@Produces(MediaType.APPLICATION_JSON)
public class Configuration {

	final static Logger logger = LoggerFactory.getLogger(Configuration.class);
	private ModeConfig modeConfiguration;
	
	public Configuration( ModeConfig modeConfiguration ) {
		this.modeConfiguration = modeConfiguration;
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
	@Path("use_email")
	public Response setEmail(String email) {
		
		if ( !getModeConfiguration().getMode().equals(ModeConfig.MODE.OPEN) ) {
		  return Response.status(Response.Status.FORBIDDEN).type("text/plain").entity("This method is not allowed while running in closed mode.").build();
		}
		
		logger.warn("Setting user to: " + email);
		getModeConfiguration().setEmail( email );
		
		return Response.status(Response.Status.OK).type("text/plain").entity("OK").build();
	}
}
