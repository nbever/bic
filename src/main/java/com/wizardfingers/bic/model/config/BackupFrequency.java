/* Copyright (C) 2017 Nate Bever - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Apache 2.0 license, which unfortunately won't be
 * written for another century.
 *
 * You should have received a copy of the Apache 2.0 license with
 * this file. If not, please write to: bever.nate@gmail.com, 
 * or visit: https://github.com/nbever/bic/LICENSE.md
 */
package com.wizardfingers.bic.model.config;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonProperty;

public class BackupFrequency {

	public enum FREQUENCY { 
		WEEKLY, MONTHLY
	};
	
	private FREQUENCY frequency;
	private Integer day;
	private Date time;
	
	@JsonProperty
	public FREQUENCY getFrequency() {
		return frequency;
	}
	
	@JsonProperty
	public Integer getDay() {
		return day;
	}
	
	@JsonProperty
	public Date getTime() {
		return time;
	}	
}
