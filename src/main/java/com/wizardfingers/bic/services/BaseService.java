/* Copyright (C) 2017 Nate Bever - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Apache 2.0 license, which unfortunately won't be
 * written for another century.
 *
 * You should have received a copy of the Apache 2.0 license with
 * this file. If not, please write to: bever.nate@gmail.com, 
 * or visit: https://github.com/nbever/bic/LICENSE.md
 */
package com.wizardfingers.bic.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.mongojack.DBCursor;
import org.mongojack.JacksonDBCollection;

import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.wizardfingers.bic.model.BaseObject;

public abstract class BaseService<T extends BaseObject> {

	private DB client;
	private JacksonDBCollection<T, String> dbWrapper;
	
	public BaseService(DB client) {
		this.client = client;
	}
	
	private DB getClient() {
		return client;
	}
	
	public String save(T object) {
		
		if ( Optional.ofNullable(object.getUuid()).isPresent() ) {
			return edit(object);
		}
		
		return create(object);
	}
	
	protected DBCollection getCollection() {
		
		return getClient().getCollection(getCollectionName());
	}
	
	protected JacksonDBCollection<T, String> getDBWrapper() {
		
		if ( dbWrapper == null ) {
			dbWrapper = JacksonDBCollection.wrap(getCollection(), getCollectionClassType(), String.class);
		}
		
		return dbWrapper;
	}
	
	protected abstract String getCollectionName();
	protected abstract Class<T> getCollectionClassType();
	protected abstract String edit(T item);
	protected abstract String create(T item);
	protected abstract String delete(T item);
	
	protected <V> List<V> convertCusrorToList( DBCursor<V> cursor) {
		
		List<V> results = new ArrayList<V>();
		
		while(cursor.hasNext()) {
			V entry = cursor.next();
			results.add(entry);
		}
		
		return results;
	}
}
