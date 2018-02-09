/* Copyright (C) 2017 Nate Bever - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Apache 2.0 license.
 *
 * You should have received a copy of the Apache 2.0 license with
 * this file. If not, please write to: bever.nate@gmail.com, 
 * or visit: https://github.com/nbever/bic/LICENSE.md
 */
package com.wizardfingers.bic.services;

import java.util.Date;
import java.util.List;

import org.mongojack.DBCursor;
import org.mongojack.DBQuery;
import org.mongojack.DBQuery.Query;
import org.mongojack.DBSort;

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
	}

	/* (non-Javadoc)
	 * @see com.wizardfingers.bic.services.BaseService#getCollectionName()
	 */
	@Override
	protected String getCollectionName() {

		return COLLECTION_NAME;
	}
	
	public List<Incident> get(Date from, Date to, List<String> states, List<String> students) {
		
		Query[] stateQueries = new Query[states.size()];
		
		for ( int i = 0; i < states.size(); i++ ) {
			stateQueries[i] = DBQuery.is("status.value", states.get(i));
		}
		
		Long fromL = from.getTime() / 1000;
		Long toL = to.getTime() / 1000;
		
		DBCursor<Incident> incidents = getDBWrapper().find()
			.greaterThanEquals("incidentTime", fromL )
			.lessThanEquals("incidentTime", toL)
			.and(
				DBQuery.in("status.value", states)
			);
		
		if (!students.isEmpty()) {
			incidents = incidents.and( DBQuery.in("studentString", students));
		}
			
		List<Incident> results = incidents.sort(DBSort.desc("incidentTime")).toArray();
		
		return results;
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
	 * @see com.wizardfingers.bic.services.BaseService#delete(com.wizardfingers.bic.model.BaseObject)
	 */
	@Override
	protected String delete(Incident item) {

		return null;
	}

}
