# bic
This is discipline management software being developed by Nate Bever and Mike Martz.  
Directions here will be updated as the project progresses.

## Building and Running

First you need to make sure that you have a database running - which you can do with this command

`mongodb/bin/mongod --dbpath db`

Advanced:  If you want to load a new database first drop the current db titled 'bic' and run this command:
`mongo localhost:27017/bic < !your_db_file_sscript!`

There is now a script at the root called `run_server` that can handle all the running and building needs.  Here are the options:

-b | build	Build the product.
-r | run	Run both the server and the web in development mode.
-s | server	Run the Java web server.
-w | web	Run the web server in dev mode.

Be sure to execute `run_server stop` when you are finished, otherwise the processes will continue as zombies on your machine.

## To launch the App

With the above command, it's now easy to get things running.  Just point your browser to 'http://localhost:8080' if it does not automatically pop up.  (It should)

# REST API

All API calls are prefixed by the path: /api/v1

## Student APIs

#### Get Students

GET /students

Parameters
|Key|Default|Values|
|---|-------|------|
|graduatingClass|<thisYear>-<thisYear-4>|Can be a single year or a span like `2014-2017`|
|searchString|*|Matches any portion of any of the names|

#### Get a specific student

GET /student/:id

#### Find students

GET /students/records

Parameters
|Key|Default|Values|
|---|-------|------|
|firstName|null|Any portion of the name, * are assumed at either end|
|lastName|null|Any portion of the name, * are assumed at either end|
|middleName|null|Any portion of the name, * are assumed at either end|
|graduatingClass|<thisYear>-<thisYear-4>|Can be a single year or a span like `2014-2017`|
|birthday|null|This is a number of milliseconds and can be a spread (will match anything in the day)|
|hoursUnfinished|0|The minimum number of hours to include that are not yet completed.  Can be a range #-#|
|hours|0|The minimum number of hours to include that were assigned with the time range.  Can be a range #-#|
|startDate|<beginning of this year>|The date from which to begin the search.|
|endDate|<now>|The end date of the search|
|numberOfIncidents|0|The minimum number of incidents to include.|
|numberOfOpenIncidents|0|The minimum number of open incidents to include.|
|sort|lastName|How the data should be sorted, comma separated.  <lastName, hoursUnfinished, numberOfIncidents, graduatingClass, hours, numberofOpenIncidents>|

#### Create student

POST /student

Input:

#### Edit student

PUT /student

Input:

## Incident APIs

#### Get incidents

POST /incidents

Parameters (In JSON object)

|Key|Default|Values|
|---|-------|------|
|startDate|Start of this school year|Millisecond value from where to start the list.|
|endDate|now|Millisecond value from where to end the list.|
|students|[] (means all)|List of Student IDs|
|assigners|[]|List of IDs for who assigned the incident.|
|reflectionState|any|Can be 'complete' or 'open'.|
|state|any|Can be WAITING_ADMINISTRATION, PENDING_RESTITUTION, PENDING_REFLECTION, COMPLETED|

#### Create new incident

POST /incident

Input:

#### Update an incident

PUT /incident

Input:

#### Get new incidents

Incidents that have not been attended to by an administrator

GET /incidents/new

#### Get Un-reviewd incidents

Incidents that needs a final review

GET /incidents/reviewed_needed

#### Get incidents in need of reflection

GET /incidents/reflections_needed

## Metric APIs

#### Summary

GET /incident/Summary

Returns some high level metrics based on time frame.

Parameters

|Key|Default|Values|
|---|-------|------|
|startTime|Beginning of the week|Date from which the summary will be computed.|
|endDate|now|Date to complete the summary.|

Return:
{
  submitted: <number>,
  reflected: <number>,
  accepted: <number>,
  completed: <number>,
  hours: {
    completed: <number>,
    total: <number>
  }
}

## Discipline default APIs

#### Get defaults

GET /disciplines

Returns:

#### Create discipline defaults

POST /disciplines

Input:

#### Edit discipline defaults

PUT /disciplines

Input:

## Settings APIs

#### Get school years

GET /school_years

Returns:
[
{ name: "2017", startDate: <number>, endDate: <number>},
...
]

#### Create school years

POST /school_years

{
  name: <string>,
  startDate: <number>,
  endDate: <number>
}

#### Edit school years

PUT /school_years

{
  name: <string>,
  startDate: <number>,
  endDate: <number>
}
