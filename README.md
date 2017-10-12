# bic
This is discipline management software being developed by Nate Bever and Mike Martz.  
Directions here will be updated as the project progresses.

## To build the server

`mvn package`

## To run the web server

`java -jar target/BIC-0.0.1-SNAPSHOT.jar server target/classes/main/resources/bic.yaml`

## To run the webapp

`cd src/web/src`
`npm install`
`npm run start`

Then point your browser to 'http://localhost:8080' if it does not automatically pop up.  (It should)

** This is a dummy webapp so don't be concerned that it looks terrible - this is just to test that things are compiling, running and that my custom webcomponents are rendering properly **

