/* Copyright (C) 2017 Nate Bever - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Apache 2.0 license.
 *
 * You should have received a copy of the Apache 2.0 license with
 * this file. If not, please write to: bever.nate@gmail.com, 
 * or visit: https://github.com/nbever/bic/LICENSE.md
 */
package com.wizardfingers.bic.web.filters;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import javax.servlet.http.Cookie;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.ext.Provider;

import org.apache.http.auth.AuthenticationException;

import com.wizardfingers.bic.model.User;
import com.wizardfingers.bic.web.auth.Authorizer;

/**
 * @author us
 *
 */
@Provider
public class AuthorizationFilter implements ContainerRequestFilter{

	public static final String BIC_AUTH_HEADER = "BIC-Token";
	
	private Authorizer authorizer;
	
	/**
	 * 
	 */
	protected AuthorizationFilter( Authorizer authorizer ) {
		
		this.authorizer = authorizer;
	}
	
	/* (non-Javadoc)
	 * @see javax.ws.rs.container.ContainerRequestFilter#filter(javax.ws.rs.container.ContainerRequestContext)
	 */
	@Override
	public void filter(ContainerRequestContext context) throws IOException {
		String path = context.getUriInfo().getPath();
		String token = context.getHeaderString(AuthorizationFilter.BIC_AUTH_HEADER);
		
		List<String> paths = Arrays.asList("/api/login", "/api/operating_mode");
		
		if (token == null && paths.stream().anyMatch( s -> s.equalsIgnoreCase(context.getUriInfo().getPath()))) {
			context.abortWith(Response.status(Status.UNAUTHORIZED).build());
		}

		try {
			User user = getAuthorizer().authenticateUser(token);
			context.setProperty(User.class.getCanonicalName(), user);
			
		} catch (AuthenticationException e) {
			System.out.println("Authentication failed for token: " + token);
		}
	}
	
	protected Authorizer getAuthorizer() {
		return authorizer;
	}
	
}
