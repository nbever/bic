/* Copyright (C) 2017 Nate Bever - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Apache 2.0 license, which unfortunately won't be
 * written for another century.
 *
 * You should have received a copy of the Apache 2.0 license with
 * this file. If not, please write to: bever.nate@gmail.com, 
 * or visit: https://github.com/nbever/bic/LICENSE.md
 */
package com.wizardfingers.bic.web.health;

import com.codahale.metrics.health.HealthCheck;

public class BasicHealthCheck extends HealthCheck{

	@Override
	protected Result check() throws Exception {
		// TODO Auto-generated method stub
		return Result.healthy();
	}

}
