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
import com.wizardfingers.bic.services.StudentAPI;
import com.wizardfingers.bic.web.health.BasicHealthCheck;
import com.wizardfingers.bic.web.rest.Login;
import com.wizardfingers.bic.web.rest.Students;

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
		
		env.healthChecks().register("Basic", new BasicHealthCheck());
		
		Students studentResource = new Students(studentApi);
		env.jersey().register(studentResource);
		
		env.jersey().register(new Login(config.getAuthConfiguration()) );
		
	}

}
