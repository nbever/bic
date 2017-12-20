/* Copyright (C) 2017 Nate Bever - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Apache 2.0 license.
 *
 * You should have received a copy of the Apache 2.0 license with
 * this file. If not, please write to: bever.nate@gmail.com, 
 * or visit: https://github.com/nbever/bic/LICENSE.md
 */
package com.wizardfingers.bic.web.filters;

import com.wizardfingers.bic.web.auth.Authorizer;

/**
 * @author us
 *
 */
public class TeacherAuthorizationFilter extends AuthorizationFilter {

	public TeacherAuthorizationFilter( Authorizer authorizer ) {
		super( authorizer );
	}
}
