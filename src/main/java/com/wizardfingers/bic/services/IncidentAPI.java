/* Copyright (C) 2017 Nate Bever - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Apache 2.0 license.
 *
 * You should have received a copy of the Apache 2.0 license with
 * this file. If not, please write to: bever.nate@gmail.com, 
 * or visit: https://github.com/nbever/bic/LICENSE.md
 */
package com.wizardfingers.bic.services;

import java.util.List;

import org.mongojack.WriteResult;

import com.mongodb.DB;
import com.wizardfingers.bic.model.Incident;

/**
 * @author us
 *
 */
public class IncidentAPI extends BaseService<Incident>{

	public static final String COLLECTION_NAME = "incidents";
	
	/**
	 * @param client
	 */
	public IncidentAPI(DB client) {
		super(client);
		// TODO Auto-generated constructor stub
	}

	/* (non-Javadoc)
	 * @see com.wizardfingers.bic.services.BaseService#getCollectionName()
	 */
	@Override
	protected String getCollectionName() {

		return COLLECTION_NAME;
	}
	
	public List<Incident> get() {
		List<Incident> incidents = getDBWrapper().find().toArray();
		return incidents;
	}

	/* (non-Javadoc)
	 * @see com.wizardfingers.bic.services.BaseService#getCollectionClassType()
	 */
	@Override
	protected Class<Incident> getCollectionClassType() {
		
		return Incident.class;
	}

	/* (non-Javadoc)
	 * @see com.wizardfingers.bic.services.BaseService#edit(com.wizardfingers.bic.model.BaseObject)
	 */
	@Override
	protected String edit(Incident item) {

		return null;
	}

	/* (non-Javadoc)
	 * @see com.wizardfingers.bic.services.BaseService#create(com.wizardfingers.bic.model.BaseObject)
	 */
	@Override
	protected String create(Incident item) {

		WriteResult<Incident, String> result = getDBWrapper().insert(item);
		return result.getSavedId();
	}

	/* (non-Javadoc)
	 * @see com.wizardfingers.bic.services.BaseService#delete(com.wizardfingers.bic.model.BaseObject)
	 */
	@Override
	protected String delete(Incident item) {

		return null;
	}

}
