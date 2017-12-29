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

import com.fasterxml.jackson.annotation.JsonProperty;
import com.wizardfingers.bic.db.MongoClientFactory;
import com.wizardfingers.bic.model.config.AuthConfig;
import com.wizardfingers.bic.model.config.BackupConfig;
import com.wizardfingers.bic.model.config.EmailConfig;
import com.wizardfingers.bic.model.config.ModeConfig;

import io.dropwizard.Configuration;

public class BICConfiguration extends Configuration {

	private BackupConfig backupConfiguration;
	private EmailConfig emailConfiguration;
	private AuthConfig authConfiguration;
	private ModeConfig modeConfiguration;

	private MongoClientFactory mongoConnectionFactory = new MongoClientFactory();
	
	@JsonProperty
	public BackupConfig getBackupConfiguration() {
		return backupConfiguration;
	}
	
	@JsonProperty
	public EmailConfig getEmailConfiguration() {
		return emailConfiguration;
	}
	
	@JsonProperty
	public AuthConfig getAuthConfiguration() {
		return authConfiguration;
	}
	
	@JsonProperty("dbConfiguration")
	public MongoClientFactory getMongoClientFactory() {
		return mongoConnectionFactory;
	}
	
	@JsonProperty("dbConfiguration")
	public void setMongoClientFactory(MongoClientFactory factory) {
		this.mongoConnectionFactory = factory;
	}
	
	@JsonProperty("modeConfiguration")
	public ModeConfig getModeConfiguration() {
		return this.modeConfiguration;
	}
	
	@JsonProperty("modeConfiguration")
	public void setModeConfiguration(ModeConfig config) {
		this.modeConfiguration = config;
	}
}
