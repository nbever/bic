/* Copyright (C) 2017 Nate Bever - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Apache 2.0 license.
 *
 * You should have received a copy of the Apache 2.0 license with
 * this file. If not, please write to: bever.nate@gmail.com, 
 * or visit: https://github.com/nbever/bic/LICENSE.md
 */
package com.wizardfingers.bic.model;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * @author us
 *
 */
public class LoginParams {

	private String token;
	
	@JsonProperty
	public String getToken() {
		return token;
	}
}
