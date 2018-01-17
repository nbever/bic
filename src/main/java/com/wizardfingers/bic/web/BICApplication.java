/* Copyright (C) 2017 Nate Bever - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Apache 2.0 license, which unfortunately won't be
 * written for another century.
 *
 * You should have received a copy of the Apache 2.0 license with
 * this file. If not, please write to: bever.nate@gmail.com, 
 * or visit: https://github.com/nbever/bic/LICENSE.md
 */
package com.wizardfingers.bic.web;

import com.mongodb.DB;
import com.wizardfingers.bic.services.IncidentAPI;
import com.wizardfingers.bic.services.StudentAPI;
import com.wizardfingers.bic.services.UserAPI;
import com.wizardfingers.bic.web.auth.Authorizer;
import com.wizardfingers.bic.web.filters.AuthorizationFeature;
import com.wizardfingers.bic.web.health.BasicHealthCheck;
import com.wizardfingers.bic.web.rest.Configuration;
import com.wizardfingers.bic.web.rest.Incidents;
import com.wizardfingers.bic.web.rest.Login;
import com.wizardfingers.bic.web.rest.Students;
import com.wizardfingers.bic.web.rest.Users;

import io.dropwizard.Application;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;

public class BICApplication extends Application<BICConfiguration>{

	public static void main(String[] args) throws Exception {
		BICApplication app = new BICApplication();
		app.run(args);
	}
	
	@Override
	public void initialize(Bootstrap<BICConfiguration> bootstrap) {
	
		super.initialize(bootstrap);
	}
	
	@Override
	public void run(BICConfiguration config, Environment env) throws Exception {
		
		DB mongoClient = config.getMongoClientFactory().build(env);
		
		StudentAPI studentApi = new StudentAPI(mongoClient);
		UserAPI userApi = new UserAPI(mongoClient);
		IncidentAPI incidentApi = new IncidentAPI(mongoClient);
		
		Authorizer authorizer = new Authorizer( config.getAuthConfiguration(), config.getModeConfiguration(), userApi );
		AuthorizationFeature authFeature = new AuthorizationFeature( authorizer );

		Users userResource = new Users(userApi);
		Students studentResource = new Students(studentApi);
		Incidents incidentResource = new Incidents(incidentApi);
		Login login = new Login( authorizer );
		Configuration configResource = new Configuration( config.getModeConfiguration(), userApi );
		
		env.healthChecks().register("Basic", new BasicHealthCheck());
		env.jersey().register( authFeature );
		env.jersey().register(userResource);
		env.jersey().register(studentResource);
		env.jersey().register(incidentResource);
		env.jersey().register(login);
		env.jersey().register(configResource);
		
	}

}
