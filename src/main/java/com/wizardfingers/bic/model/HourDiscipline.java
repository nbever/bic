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

public class HourDiscipline extends Discipline{

	private Float hoursCompleted;
	private Float hoursAssigned;
	
	protected HourDiscipline() {
		super();
	}
	
	/**
	 * @param name
	 * @param description
	 * @param completed
	 */
	public HourDiscipline(String name, String description, Boolean completed,
		Float hoursCompleted, Float hoursAssigned ) {
		super(name, description, completed);
		
		this.hoursAssigned = hoursAssigned;
		this.hoursCompleted = hoursCompleted;
	}
	
	@JsonProperty
	public Float getHoursCompleted() {
		return hoursCompleted;
	}
	
	@JsonProperty
	public Float getHoursAssigned() {
		return hoursAssigned;
	}
}
