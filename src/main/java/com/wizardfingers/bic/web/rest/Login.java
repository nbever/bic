/* Copyright (C) 2017 Nate Bever - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Apache 2.0 license.
 *
 * You should have received a copy of the Apache 2.0 license with
 * this file. If not, please write to: bever.nate@gmail.com, 
 * or visit: https://github.com/nbever/bic/LICENSE.md
 */
package com.wizardfingers.bic.web.rest;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.wizardfingers.bic.model.LoginParams;
import com.wizardfingers.bic.model.config.AuthConfig;

/**
 * @author us
 *
 */
@Path("/login")
@Produces(MediaType.TEXT_PLAIN)
public class Login {

	private AuthConfig authConfig;
	
	public Login(AuthConfig authConfig) {
		this.authConfig = authConfig;
	}
	
	@POST
	@Path("/")
	public String login( LoginParams login ) {
		
		try {
			
			GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new JacksonFactory())
			    .setAudience(Collections.singletonList( getAuthConfig().getClientId() ))
			    .build();
			
			GoogleIdToken idToken = verifier.verify(login.getToken());
			
			if ( idToken != null ) {
				return "YES!";
			}
			
		} catch (GeneralSecurityException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return "Failure!";
	}
	
	private AuthConfig getAuthConfig() {
		return this.authConfig;
	}
}
