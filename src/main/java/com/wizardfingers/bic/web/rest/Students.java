/* Copyright (C) 2017 Nate Bever - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Apache 2.0 license.
 *
 * You should have received a copy of the Apache 2.0 license with
 * this file. If not, please write to: bever.nate@gmail.com, 
 * or visit: https://github.com/nbever/bic/LICENSE.md
 */
package com.wizardfingers.bic.web.rest;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.codahale.metrics.annotation.Timed;
import com.wizardfingers.bic.model.Student;
import com.wizardfingers.bic.services.StudentAPI;

@Path("/students")
@Produces(MediaType.APPLICATION_JSON)
public class Students {

	final static Logger logger = LoggerFactory.getLogger(Students.class);
	private StudentAPI studentApi;
	
	public Students(StudentAPI studentApi) {
		this.studentApi = studentApi;
	}
	
	@GET
	@Timed
	@Path("/{id}")
	public Student getStudent(@PathParam("id") String id) {
		
		Student student = getStudentApi().getStudent( id );
		
		return student;
	}
	
	@GET
	@Timed
	public List<Student> getStudents(@QueryParam("graduatingClass") String graduatingClass, @QueryParam("searchString") String searchString) {
		
		if ( searchString == null ){
			searchString = ".";
		}
		
		Integer maxGraduatingClass = Integer.MAX_VALUE;
		Integer minGraduatingClass = 1900;
		
		
		if ( graduatingClass != null ) {
			try {
				if ( graduatingClass.contains("-") ) {
					String[] years = graduatingClass.split("-");
					minGraduatingClass = Integer.parseInt(years[0]);
					maxGraduatingClass = Integer.parseInt(years[1]);
				}
				else {
					maxGraduatingClass = Integer.parseInt(graduatingClass);
					minGraduatingClass = Integer.parseInt(graduatingClass);
				}
			}
			catch( NumberFormatException e ) {
				logger.warn("Graduating years was not in an integer parseable format and will be ignored: " + graduatingClass);
			}
		}
		
		List<Student> users = getStudentApi().getStudents(minGraduatingClass, maxGraduatingClass, searchString);
		
		return users;
	}
	
	@POST
	@Timed
	public Response createStudent(Student student) {
		
		String objectId = getStudentApi().save(student);
		
		return Response.status(Response.Status.OK).type("text/plain").entity(objectId).build();
	}
	
	private StudentAPI getStudentApi() {
		return studentApi;
	}
}
