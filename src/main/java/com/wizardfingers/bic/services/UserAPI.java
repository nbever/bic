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
import java.util.Optional;

import com.mongodb.DB;
import com.wizardfingers.bic.model.User;

/**
 * @author us
 *
 */
public class UserAPI extends BaseService<User>{

	public static final String COLLECTION_NAME = "user";
	
	/**
	 * @param client
	 */
	public UserAPI(DB client) {
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
	protected Class<User> getCollectionClassType() {

		return User.class;
	}
	
	public User getUserByLogin( String emailAddress ) {
		List<User> users = getDBWrapper().find().is("email", emailAddress).toArray();
		
		Optional<User> user = users.stream().findFirst();
		
		if ( user.isPresent() ) {
			return user.get();
		}
		
		return null;
	}

	/* (non-Javadoc)
	 * @see com.wizardfingers.bic.services.BaseService#edit(com.wizardfingers.bic.model.BaseObject)
	 */
	@Override
	protected String edit(User item) {
		// TODO Auto-generated method stub
		return null;
	}

	/* (non-Javadoc)
	 * @see com.wizardfingers.bic.services.BaseService#delete(com.wizardfingers.bic.model.BaseObject)
	 */
	@Override
	protected String delete(User item) {
		// TODO Auto-generated method stub
		return null;
	}

}
