/* Copyright (C) 2017 Nate Bever - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Apache 2.0 license.
 *
 * You should have received a copy of the Apache 2.0 license with
 * this file. If not, please write to: bever.nate@gmail.com, 
 * or visit: https://github.com/nbever/bic/LICENSE.md
 */
package com.wizardfingers.bic.model.config;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * @author us
 *
 */
public class AuthConfig {

	private String clientId;
	private String clientSecret;
	private Long reauthPeriodInMinutes;
	
	@JsonProperty
	public String getClientId() {
		return this.clientId;
	}
	
	@JsonProperty
	public String getClientSecret() {
		return this.clientSecret;
	}
	
	@JsonProperty
	public Long reauthPeriodInMinutes() {
		return this.reauthPeriodInMinutes;
	}
}
