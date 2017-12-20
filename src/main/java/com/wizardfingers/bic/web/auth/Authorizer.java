/* Copyright (C) 2017 Nate Bever - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Apache 2.0 license.
 *
 * You should have received a copy of the Apache 2.0 license with
 * this file. If not, please write to: bever.nate@gmail.com, 
 * or visit: https://github.com/nbever/bic/LICENSE.md
 */
package com.wizardfingers.bic.web.auth;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;

import org.apache.commons.collections4.map.PassiveExpiringMap;
import org.apache.http.auth.AuthenticationException;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.wizardfingers.bic.model.User;
import com.wizardfingers.bic.model.config.AuthConfig;
import com.wizardfingers.bic.services.UserAPI;

/**
 * @author us
 *
 */
public class Authorizer {

	private PassiveExpiringMap<String, User> authCache;
	private GoogleIdTokenVerifier verifier;
	
	private final AuthConfig authConfig;
	private final UserAPI userApi;
	
	public Authorizer( AuthConfig authenticationConfig, UserAPI userApi ) {
		this.authConfig = authenticationConfig;
		this.userApi = userApi;
	}
	
	public User authenticateUser( String token ) throws AuthenticationException {
		
		if ( getAuthCache().containsKey( token ) ){
			return getAuthCache().get( token );
		}
		
		return doGoogleAuth( token );
	}
	
	private User doGoogleAuth( String token ) throws AuthenticationException {
		
		try {
			GoogleIdToken idToken = getVerifier().verify( token );
			
			if ( idToken == null ) {
				throw new AuthenticationException();
			}
			
			Payload payload = idToken.getPayload();
			String email = payload.getEmail();
			
			User user = getUserApi().getUserByLogin( email );
			
			if ( user == null ) {
				throw new AuthenticationException();
			}
			
			getAuthCache().put( token, user );
			
			return user;
			
		} catch (GeneralSecurityException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		throw new AuthenticationException();
	}
	
	private PassiveExpiringMap<String, User> getAuthCache() {
		
		if ( authCache == null ) {
			authCache = new PassiveExpiringMap<>( getAuthConfig().reauthPeriodInMinutes() * 60 * 1000 );
		}
		
		return authCache;
	}
	
	private AuthConfig getAuthConfig() {
		return authConfig;
	}
	
	private GoogleIdTokenVerifier getVerifier() {
		
		if ( verifier == null ) {
			verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new JacksonFactory())
			    .setAudience(Collections.singletonList( getAuthConfig().getClientId() ))
			    .build();
		}
		
		return verifier;
	}
	
	private UserAPI getUserApi() {
		return this.userApi;
	}
}
