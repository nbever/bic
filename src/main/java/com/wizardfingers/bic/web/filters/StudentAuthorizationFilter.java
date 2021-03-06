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

import javax.ws.rs.container.ContainerRequestContext;

import org.apache.http.auth.AuthenticationException;

import com.wizardfingers.bic.model.User;
import com.wizardfingers.bic.web.auth.Authorizer;

/**
 * @author us
 *
 */
public class StudentAuthorizationFilter extends AuthorizationFilter {

	public StudentAuthorizationFilter( Authorizer authorizer ) {
		super( authorizer );
	}
	
	/* (non-Javadoc)
	 * @see com.wizardfingers.bic.web.filters.AuthorizationFilter#filter(javax.ws.rs.container.ContainerRequestContext)
	 */
	@Override
	public void filter(ContainerRequestContext context) throws IOException {
		super.filter(context);
		String header = context.getHeaderString(AuthorizationFilter.BIC_AUTH_HEADER);
	}
}
