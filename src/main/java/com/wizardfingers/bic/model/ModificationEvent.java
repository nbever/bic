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
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.wizardfingers.bic.model.serializers.JsonDateDeserializer;
import com.wizardfingers.bic.model.serializers.JsonDateSerializer;

public class ModificationEvent {

	private Date modifyDate;
	private String fieldChanged;
	private Object previousValue;
	private Object newValue;
	private String editorUuid;
	
	@JsonSerialize(using=JsonDateSerializer.class)
	@JsonDeserialize(using=JsonDateDeserializer.class)
	@JsonProperty
	public Date getModifyDate() {
		return modifyDate;
	}
	
	@JsonProperty
	public String getFieldChanged() {
		return fieldChanged;
	}
	
	@JsonProperty
	public Object getPreviousValue() {
		return previousValue;
	}
	
	@JsonProperty
	public Object getNewValue() {
		return newValue;
	}
	
	@JsonProperty
	public String getEditorUuid() {
		return editorUuid;
	}
	
	
}
