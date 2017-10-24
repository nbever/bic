/* Copyright (C) 2017 Nate Bever - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Apache 2.0 license.
 *
 * You should have received a copy of the Apache 2.0 license with
 * this file. If not, please write to: bever.nate@gmail.com, 
 * or visit: https://github.com/nbever/bic/LICENSE.md
 */
package com.wizardfingers.bic.services;

import com.wizardfingers.bic.model.RolePrivileges;
import com.mongodb.DB;

/**
 * @author us
 *
 */
public class RoleAPI extends BaseService<RolePrivileges>{

	public static final String COLLECTION_NAME = "role-privileges";
	
	/**
	 * @param client
	 */
	public RoleAPI(DB client) {
		super(client);
	}

	/* (non-Javadoc)
	 * @see com.wizardfingers.bic.services.BaseService#getCollectionName()
	 */
	@Override
	protected String getCollectionName() {
		
		return COLLECTION_NAME;
	}

	/* (non-Javadoc)
	 * @see com.wizardfingers.bic.services.BaseService#getCollectionClassType()
	 */
	@Override
	protected Class<RolePrivileges> getCollectionClassType() {
		
		return RolePrivileges.class;
	}

	/* (non-Javadoc)
	 * @see com.wizardfingers.bic.services.BaseService#edit(com.wizardfingers.bic.model.BaseObject)
	 */
	@Override
	protected String edit(RolePrivileges item) {
		// TODO Auto-generated method stub
		return null;
	}

	/* (non-Javadoc)
	 * @see com.wizardfingers.bic.services.BaseService#delete(com.wizardfingers.bic.model.BaseObject)
	 */
	@Override
	protected String delete(RolePrivileges item) {
		// TODO Auto-generated method stub
		return null;
	}

}
