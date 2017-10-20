/* Copyright (C) 2017 Nate Bever - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Apache 2.0 license, which unfortunately won't be
 * written for another century.
 *
 * You should have received a copy of the Apache 2.0 license with
 * this file. If not, please write to: bever.nate@gmail.com, 
 * or visit: https://github.com/nbever/bic/LICENSE.md
 */
package com.wizardfingers.bic.tools;

import java.io.FileWriter;
import java.io.IOException;
import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Random;
import java.util.UUID;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wizardfingers.bic.model.PRIVILEGES;
import com.wizardfingers.bic.model.ROLE;
import com.wizardfingers.bic.model.RolePrivileges;
import com.wizardfingers.bic.model.Student;
import com.wizardfingers.bic.model.User;

public class DBLoader {

	public static void main(String[] args) {
		
		DBLoader loader = new DBLoader();
		try {
			loader.createDB();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	private enum FIRST_NAMES_M {
		MIKE, NATE, JOHN, JAMES, MALAKAI, ABISHAI, MASON, CADEN, SNOOP, KYLE, KAI, GRAYSON, PIERRE, MING, FELIX, FELIPE, JUAN, SOICHI,
		KENNY, CHARLES, SHAQUILLE, ERNIE, BRUCE, BOB, ROBERT, ROGER, AARON, MILES, GUNNER, MARK, PHINNAES, KOBE, PAUL, CHRIS, KEVIN,
		JEFF, FRANK, ALOYISIUS, ISAAC, TODD, DAVE, DERRICK, BEN, BILLY, REESE, CRAIG, SHAWN, STEPHEN, STEVE, TIM, PATRICK, GORDON, ANDRE,
		COLE, AUSTIN, BRIAN, HANK, DON, LARRY, JUNIOR, HANS, SHERLOCK, JACK, JIM, ZAZA, CLINT, KLAY, MICHAEL
	};
		
	private enum FIRST_NAMES_F {	
		MICHELLE, MEGAN, CHANDRA, SANDY, THERESA, KENDRA, MOLLY, KIM, CATHY, EVE, AVA, ELIANA, ELIZABETH, ELLE, BETH, HOLLY, GRACE, ROSE,
		ABBY, ANDREA, BERTHA, ETHEL, RUTH, DONNA, WANDA, SHERI, DEANNE, ROBIN, NIKKI, MIRANDA, BRIDGET, DANA, LAURA, SHAMEQUA, KELLY, KATIE,
		RANDI, ELEANOR, TAHANI, ANGELA, KRISTEN, KATE, TERI, CHERYL, LISA, BECKY, REBECCA, OLIVIA, EMMA, ISABEL, ABIGAIL, SOPHIE, OPHELIA,
		CHARLOTTE, AMELIA, EMILY, SCARLETT, LAYLA, ALEXA, LILY, AUBREY, HANNAH, CLAIRE, VIOLET, JAILEY, BELLA, TAYLOR, ZOE, SAMANTHA, LEAH
	};
	
	private enum LAST_NAMES {
		WILLAIMS, SMITH, MARTZ, BEVER, JOHNSON, GOMEZ, NGUYEN, BRYANT, JONES, RODRIGUEZ, BROWN, WILSON, THOMAS, GARCIA, NOONAN, MILEK,
		CURRY, JORDAN, BELL, LIVINGSTON, BARKLEY, PARKER, EDWARDS, MURPHY, RIVERA, CAMPBELL, HOROWITZ, KING, SCOTT, ALLEN, YOUNG, WALKER,
		COLLINS, NELSON, BAKER, PEREZ, HUNG, RICHARDSON, COX, BENNET, GARNETT, RUTH, REED, HUGHES, FOSTER, LONG, BARNES, PIPPEN, ALEXANDER,
		WALLACE, SULLIVAN, WEST, HARDEN, ANTHONY, MYERS, PRICE, KIM, BLACK, PALMER, STONE, VASQUEZ, MASON, JIMINEZ, JAMES, ANDERSON, HOLMES
	};
	
	private FileWriter fileWriter;
	
	public void createDB() throws IOException {
		
		try ( FileWriter fw = getFileWriter() ) {
			List<Student> students = insertStudents(fw);
			List<User> users = insertTeachers(fw);
			
			createDefaultRoles(fw);
			
			createDisciplines(fw);
		}
	}
	
	private String convertNameCase(String str) {
		return str.substring(0, 1) + str.toLowerCase().substring(1);
	}
	
	private String[] buildFullName() {
		Boolean male = new Random().nextBoolean();
		
		String firstName = "";
		String middleName = "";
		
		if (male) {
			firstName = convertNameCase(FIRST_NAMES_M.values()[(int) (Math.random() * FIRST_NAMES_M.values().length)].name());
			middleName = convertNameCase(FIRST_NAMES_M.values()[(int) (Math.random() * FIRST_NAMES_M.values().length)].name());
		}
		else {
			firstName = convertNameCase(FIRST_NAMES_F.values()[(int) (Math.random() * FIRST_NAMES_F.values().length)].name());
			middleName = convertNameCase(FIRST_NAMES_F.values()[(int) (Math.random() * FIRST_NAMES_F.values().length)].name());				
		}
		
		String lastName = convertNameCase(LAST_NAMES.values()[(int) (Math.random() * LAST_NAMES.values().length)].name());
		
		String[] names = new String[]{firstName, middleName, lastName};
		return names;
	}
	
	private List<Student> insertStudents(FileWriter fw) throws IOException {
		
		List<Student> students = new ArrayList<Student>();
		
		//create 400 students
		for ( int i = 0; i < 400; i++) {

			String[] names = buildFullName();
			String firstName = names[0];
			String middleName = names[1];
			String lastName = names[2];
			
			Integer graduatingClass = 2017 + Math.floorDiv(i, 100);
			String schoolId = UUID.randomUUID().toString();
			String email = firstName.toLowerCase() + "." + middleName.toLowerCase().substring(0,  1) + "." + lastName.toLowerCase() + "@gmail.com";
			ROLE role = ROLE.STUDENT;
			String userName = firstName.toLowerCase().substring(0, 1) + lastName.toLowerCase() + ((int)(Math.random() * 100));
			Instant instant = Instant.now();
			instant.minus(Duration.ofDays(365*16));
			instant.plusMillis((int)(Math.random() * (1000*60*60*24*365)));
			Date birthday = new Date(instant.getEpochSecond()*1000);
			
			Student student = new Student(firstName, lastName, middleName, birthday, schoolId, email, null, role, userName, graduatingClass );
			students.add(student);
			
			ObjectMapper om = new ObjectMapper();
			String json = om.writeValueAsString(student);
			json = json.replaceAll(",\"_id\":null", "");
			fw.write("db.user.insert(" + json + ");\n");
		}
		
		return students;
		
	}
	
	private List<User> insertTeachers(FileWriter fw) throws IOException {
		List<User> teachers = new ArrayList<User>();
		
		//create 40 teachers
		for ( int i = 0; i < 40; i++) {

			String[] names = buildFullName();
			String firstName = names[0];
			String middleName = names[1];
			String lastName = names[2];
			
			String schoolId = UUID.randomUUID().toString();
			String email = firstName.toLowerCase() + "." + middleName.toLowerCase().substring(0,  1) + "." + lastName.toLowerCase() + "@gmail.com";
			ROLE role = ROLE.TEACHER;
			
			if ( i < 2 ) {
				role = ROLE.ADMIN;
			}
			
			String userName = firstName.toLowerCase().substring(0, 1) + lastName.toLowerCase() + ((int)(Math.random() * 100));
			Instant instant = Instant.now();
			instant.minus(Duration.ofDays(365*((int)(Math.random() * 15))));
			instant.plusMillis((int)(Math.random() * (1000*60*60*24*365)));
			Date birthday = new Date(instant.getEpochSecond()*1000);
			
			User teacher = new User(firstName, lastName, middleName, birthday, schoolId, email, null, role, userName );
			teachers.add(teacher);
			
			ObjectMapper om = new ObjectMapper();
			String json = om.writeValueAsString(teacher);
			json = json.replaceAll(",\"_id\":null", "");
			fw.write("db.user.insert(" + json + ");\n");
		}
		
		return teachers;		
	}
	
	private void createDefaultRoles(FileWriter fw) throws IOException {
		
		List<PRIVILEGES> studentPriveleges = Arrays.asList(PRIVILEGES.VIEW_SELF, PRIVILEGES.ENTER_REFLECTION);
		List<PRIVILEGES> teacherPrivileges = Arrays.asList(
			PRIVILEGES.VIEW_SELF,
			PRIVILEGES.VIEW_STUDENTS,
			PRIVILEGES.ENTER_INCIDENT,
			PRIVILEGES.MODIFY_INCIDENT
		);
		List<PRIVILEGES> adminPrivileges = Arrays.asList(PRIVILEGES.values());		
		
		List<RolePrivileges> privileges = Arrays.asList(
			new RolePrivileges(ROLE.STUDENT, studentPriveleges),
			new RolePrivileges(ROLE.TEACHER, teacherPrivileges),
			new RolePrivileges(ROLE.ADMIN, adminPrivileges));
		
		privileges.stream().forEach(privilegeSet -> {
			
			try {
				ObjectMapper om = new ObjectMapper();
				String json = om.writeValueAsString(privilegeSet);
				json = json.replaceAll(",\"_id\":null", "");
				fw.write("db.role_privileges.insert(" + json + ");\n");
			}
			catch( IOException e ){
				e.printStackTrace();
			}
		});
		
	}
	
	private void createDisciplines(FileWriter fw) {
		
	}
	
	private FileWriter getFileWriter() throws IOException {
		
		if ( fileWriter == null ) {
			fileWriter = new FileWriter("build_db.sh", false);
		}
		
		return fileWriter;
	}
}
