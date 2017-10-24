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

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AssignmentDiscipline extends Discipline{

	private Date scheduledDate;
	private Date dateServed;
	private String assignmentDescription;
	
	/**
	 * @param name
	 * @param description
	 * @param completed
	 */
	public AssignmentDiscipline(String name, String description, Boolean completed,
		Date scheduledDate, Date dateServed, String assignmentDescription) {
		
		super(name, description, completed);
		
		this.scheduledDate = scheduledDate;
		this.dateServed = dateServed;
		this.assignmentDescription = assignmentDescription;
	}

	
	@JsonProperty
	public Date getScheduledDate() {
		return scheduledDate;
	}
	
	@JsonProperty
	public Date getDateServed() {
		return dateServed;
	}
	
	@JsonProperty
	public String getAssignmentDescription() {
		return assignmentDescription;
	}
}
