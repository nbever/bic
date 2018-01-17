/* Copyright (C) 2017 Nate Bever - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Apache 2.0 license, which unfortunately won't be
 * written for another century.
 *
 * You should have received a copy of the Apache 2.0 license with
 * this file. If not, please write to: bever.nate@gmail.com, 
 * or visit: https://github.com/nbever/bic/LICENSE.md
 */
package com.wizardfingers.bic.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@JsonTypeInfo(use=JsonTypeInfo.Id.CLASS, include=JsonTypeInfo.As.PROPERTY, property="@class")
public class Discipline extends BaseObject{

	private String name;
	private String description;
	private Boolean completed;
	
	protected Discipline() {
		super();
	}
	
	/**
	 * 
	 */
	public Discipline( String name, String description, Boolean completed ) {
		this.name = name;
		this.description = description;
		this.completed = completed;
	}
	
	@JsonProperty
	public Boolean isCompleted() {
		return completed;
	}
	
	@JsonProperty
	public String getDescription() {
		return this.description;
	}
	
	@JsonProperty
	public String getName() {
		return this.name;
	}
}
