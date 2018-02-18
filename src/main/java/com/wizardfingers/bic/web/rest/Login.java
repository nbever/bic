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
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import org.apache.http.auth.AuthenticationException;
import org.eclipse.jetty.http.HttpStatus;
import com.wizardfingers.bic.model.LoginParams;
import com.wizardfingers.bic.model.ROLE;
import com.wizardfingers.bic.model.User;
import com.wizardfingers.bic.web.filters.AuthorizationFilter;
import com.wizardfingers.bic.web.auth.Authorizer;
import com.wizardfingers.bic.web.auth.BICAuth;

/**
 * @author us
 *
 */
@Path("/login")
@Produces(MediaType.TEXT_PLAIN)
public class Login {

	private Authorizer authorizer;
	
	public Login( Authorizer authorizer ) {
		this.authorizer = authorizer;
	}
	
	@BICAuth(ROLE.STUDENT)
	@POST
	@Path("/")
	public User login( @Context HttpServletRequest request, @Context HttpServletResponse response, LoginParams login ) {
		
		User user;
		String token = request.getHeader(AuthorizationFilter.BIC_AUTH_HEADER);
		
		try {
			user = getAuthorizer().authenticateUser( login.getToken() );
			
			if ( user == null ) {
				throw new AuthenticationException();
			}
			
		}
		catch( Exception authException ) {
			throw new WebApplicationException("Authentication Failed", HttpStatus.UNAUTHORIZED_401);
		}

		return user;
	}
	
	private Authorizer getAuthorizer() {
		return this.authorizer;
	}
}
