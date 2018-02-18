/* Copyright (C) 2017 Nate Bever - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Apache 2.0 license.
 *
 * You should have received a copy of the Apache 2.0 license with
 * this file. If not, please write to: bever.nate@gmail.com, 
 * or visit: https://github.com/nbever/bic/LICENSE.md
 */
package com.wizardfingers.bic.web.filters;

import javax.ws.rs.container.DynamicFeature;
import javax.ws.rs.container.ResourceInfo;
import javax.ws.rs.core.FeatureContext;
import javax.ws.rs.ext.Provider;

import com.wizardfingers.bic.model.ROLE;
import com.wizardfingers.bic.web.auth.Authorizer;
import com.wizardfingers.bic.web.auth.BICAuth;

/**
 * @author us
 *
 */
@Provider
public class AuthorizationFeature implements DynamicFeature{

	private final Authorizer authorizer;
	
	/**
	 * 
	 */
	public AuthorizationFeature( Authorizer authorizer ) {
		
		this.authorizer = authorizer;
	}
	
	/* (non-Javadoc)
	 * @see javax.ws.rs.container.DynamicFeature#configure(javax.ws.rs.container.ResourceInfo, javax.ws.rs.core.FeatureContext)
	 */
	@Override
	public void configure(ResourceInfo resource, FeatureContext context) {
		
		if ( resource.getResourceMethod().isAnnotationPresent(BICAuth.class) ) {
			
			final ROLE role = resource.getResourceMethod().getAnnotation(BICAuth.class).value();
			AuthorizationFilter authFilter;
			
			switch( role ) {
				case ADMIN:
					authFilter = new AdminAuthorizationFilter( getAuthorizer() );
					break;
				case TEACHER:
					authFilter = new TeacherAuthorizationFilter( getAuthorizer() );
					break;
				case OPEN:
					authFilter = new OpenAuthorizationFilter( getAuthorizer() );
				default: 
					authFilter = new StudentAuthorizationFilter( getAuthorizer() );
			}
			
			context.register( authFilter );
			context.register(AuthorizationResponseFilter.class);
		}
	}

	private Authorizer getAuthorizer() {
		return this.authorizer;
	}
	
}
