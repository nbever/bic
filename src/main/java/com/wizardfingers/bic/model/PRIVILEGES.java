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

public enum PRIVILEGES {

	VIEW_STUDENTS("View Students", "Can view all students"), 
	VIEW_SELF("View Self", "Can view my own information"), 
	ENTER_INCIDENT("Enter Incident Report", "Can create an incident report"), 
	MODIFY_INCIDENT("Modify Incident Report", "Can modify anything in an incident report"), 
	DELETE_INCIDENT("Delete Incident Report", "Can delete an incident report"),
	PASS_JUDGEMENT("Assign punitive measures", "Can assign required restitution to an incident report"),
	COMPLETE_RESTITUTION("Complete Restitution", "Can enter hours served or enter completion of assigned punishments"),
	CREATE_ACCOUNTS("Create accounts", "Can create accounts in the system"),
	MODIFY_ACCOUNTS("Modify existing accounts", "Can modify existing accounts"),
	DETETE_ACCOUNTS("Delete existing accounts", "Can delete existing accounts from the system"),
	SET_DB_SETTINGS("Define database configuration", "Can enter database configuration options and change them"),
	DISCIPLINE_SETTINGS("Define discipline settings", "Can define discipline settings in the system"),
	EMAIL_CONFIGUTAION("Define email configuration", "Can define the email settings for the application"),
	ENTER_REFLECTION("Create reflection", "Can submit a reflection for a given report");
	
	private String title;
	private String description;
	
	private PRIVILEGES(String title, String description){
		this.title = title;
		this.description = description;
	}
	
	@JsonProperty
	public String getTitle() {
		return this.title;
	}
	
	@JsonProperty
	public String getDescription() {
		return this.description;
	}
}
