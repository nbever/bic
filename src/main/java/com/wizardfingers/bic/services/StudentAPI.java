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

import java.util.List;

import org.mongojack.DBCursor;

import com.mongodb.DB;
import com.wizardfingers.bic.model.ROLE;
import com.wizardfingers.bic.model.Student;

public class StudentAPI extends BaseService<Student>{

	public static final String COLLECTION_NAME = "users";
	
	public StudentAPI(DB client) {
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
	protected Class<Student> getCollectionClassType() {

		return Student.class;
	}	
	
	public List<Student> getStudents() {
		
		DBCursor<Student> students = getDBWrapper().find().is("role.value", ROLE.STUDENT.name());
		
		List<Student> results = convertCusrorToList(students);
		return results;
	}

	/* (non-Javadoc)
	 * @see com.wizardfingers.bic.services.BaseService#edit(com.wizardfingers.bic.model.BaseObject)
	 */
	@Override
	protected String edit(Student item) {
		// TODO Auto-generated method stub
		return null;
	}

	/* (non-Javadoc)
	 * @see com.wizardfingers.bic.services.BaseService#delete(com.wizardfingers.bic.model.BaseObject)
	 */
	@Override
	protected String delete(Student item) {
		// TODO Auto-generated method stub
		return null;
	}
}
