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
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

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
}
