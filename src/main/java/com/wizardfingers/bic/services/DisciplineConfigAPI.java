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
import com.wizardfingers.bic.model.Discipline;

public class DisciplineConfigAPI extends BaseService<Discipline> {

	public static final String COLLECTION_NAME = "disciplines";
	
	/**
	 * @param client
	 */
	public DisciplineConfigAPI(DB client) {
		super(client);
	}

	@Override
	protected String getCollectionName() {

		return COLLECTION_NAME;
	}
	
	/* (non-Javadoc)
	 * @see com.wizardfingers.bic.services.BaseService#getCollectionClassType()
	 */
	@Override
	protected Class<Discipline> getCollectionClassType() {
		// TODO Auto-generated method stub
		return Discipline.class;
	}	
	
	public List<Discipline> get() {
		List<Discipline> disciplines = getDBWrapper().find().toArray();
		return disciplines;
	}

	/* (non-Javadoc)
	 * @see com.wizardfingers.bic.services.BaseService#edit(com.wizardfingers.bic.model.BaseObject)
	 */
	@Override
	protected String edit(Discipline item) {
		// TODO Auto-generated method stub
		return null;
	}

	/* (non-Javadoc)
	 * @see com.wizardfingers.bic.services.BaseService#create(com.wizardfingers.bic.model.BaseObject)
	 */
	@Override
	protected String create(Discipline item) {

		WriteResult<Discipline, String> result = getDBWrapper().insert(item);
		return result.getSavedId();
	}

	/* (non-Javadoc)
	 * @see com.wizardfingers.bic.services.BaseService#delete(com.wizardfingers.bic.model.BaseObject)
	 */
	@Override
	protected String delete(Discipline item) {
		// TODO Auto-generated method stub
		return null;
	}
}
