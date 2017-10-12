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

import java.util.LinkedHashMap;
import java.util.Optional;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum INCIDENT_STATE {

	WAITING_ADMINISTRATION, PENDING_RESTITUTION, PENDING_REFLECTION, COMPLETED, UNKNOWN;
	
	@JsonCreator
	public static INCIDENT_STATE fromString(LinkedHashMap<String, String> obj) {
		
		Optional<INCIDENT_STATE> optState = Optional.ofNullable(INCIDENT_STATE.valueOf(obj.get("value")));
		
		if ( optState.isPresent() ) {
			return optState.get();
		}
		
		return INCIDENT_STATE.UNKNOWN;
	}
	
	@JsonProperty
	public String getValue() {
		return this.name();
	}
}
