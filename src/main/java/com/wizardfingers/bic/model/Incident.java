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
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Incident extends BaseObject{

	private UUID studentUuid;
	private UUID creatorUuid;
	private UUID administratorUuid;
	private List<Discipline> disciplineAssignments;
	private INCIDENT_STATE status;
	
	private Date incidentTime;
	private Date creationTime;
	private Date administerTime;
	
	private String reflection;
	private List<ModificationEvent> incidentHistory;
	private String title;
	private String description;
	
	@JsonProperty
	public UUID getStudentUuid() {
		return studentUuid;
	}
	
	@JsonProperty
	public UUID getCreatorUuid() {
		return creatorUuid;
	}
	
	@JsonProperty
	public UUID getAdministratorUuid() {
		return administratorUuid;
	}
	
	@JsonProperty
	public List<Discipline> getDisciplineAssignments() {
		return disciplineAssignments;
	}
	
	@JsonProperty
	public INCIDENT_STATE getStatus() {
		return status;
	}
	
	@JsonProperty
	public Date getIncidentTime() {
		return incidentTime;
	}
	
	@JsonProperty
	public Date getCreationTime() {
		return creationTime;
	}
	
	@JsonProperty
	public Date getAdministerTime() {
		return administerTime;
	}
	
	@JsonProperty
	public String getReflection() {
		return reflection;
	}
	
	@JsonProperty
	public List<ModificationEvent> getIncidentHistory() {
		return incidentHistory;
	}
	
	@JsonProperty
	public String getTitle() {
		return title;
	}
	
	@JsonProperty
	public String getDescription() {
		return description;
	}
}
