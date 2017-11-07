package com.wizardfingers.bic.model.serializers;

import java.io.IOException;
import java.util.Optional;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.wizardfingers.bic.model.ROLE;

public class RoleDeserializer extends JsonDeserializer<ROLE>{

	@Override
	public ROLE deserialize(JsonParser parser, DeserializationContext context) throws IOException, JsonProcessingException {
		
		String value = parser.getValueAsString();
		
		Optional<ROLE> role = Optional.ofNullable(ROLE.valueOf(value));
		
		if ( role.isPresent() ) {
			return role.get();
		}
		
		return ROLE.STUDENT;
	}
}