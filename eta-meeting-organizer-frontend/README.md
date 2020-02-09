# Eta Meeting Organizer Frontend

## Project Structure

This project is written in Angular version 9.0.0.

```text
eta-meeting-organizer-frontend/ - Project root
│
├── src/
│   │ ===== Main folders =====
│   ├── app/ - Angular application related files
│   │   │ ===== Module folders =====
│   │   ├── models/ - Database and view models and directories
│   │   ├── welcome/ - Welcome sample module [DELETE IT]
│   │   └── shared/ - Shared logic across modules and directories
│   ├── assets/ - Frontend assets
│   │   └── i18n/ - internalization files [see Configuration - Internalization]
│   └── environments/ - Environment files [see Configuration - Environment]
├── dev-docs/ [see Development Documentation]
│ ===== Optional folders =====
├── dist/ - Distributable bundle [see Main commands]
└── node_modules/ - Node modules [see Main commands]

```

## Main commands
Listing of main commands for the project. **All commands bellow require node.js installation.**

`$ npm install` - Install the 3rd party dependencies  
`$ npm run start` - **Development only** Serve frontend content locally without transpile on localhost:4200.  
`$ npm run build` - **Development only** Transpile the source files to javascript with _development_ configurations [see Configuration - Environment]. Results will be written to the `dist/` folder.  
`$ npm run dist` - **Production only** Transpile the source files to javascript with _production_ configurations [see Configuration - Environment]. Results will be written to the `dist/` folder.  
`$ npm run lint` - Runs linter. Checks code style.  
`$ npm run test` - Runs unit tests.  
`$ npm run e2e` - Runs end to end tests.  
## Configuration

#### Environment

Go to `src/environments` to see the environment configuration files.

Environment profiles:  

`environment.ts` - **Development only** Used when running the application in development mode `$ npm run start` or using `$ npm run build` to transpile source files. 

`environment.prod.ts` - **Production only** Used when creating distribution package for any prod-like environments `$ npm run dist`. 

List of available configurations:  

| Variable          | Description                               	| Default value             	| Example                         	|
|-------------------|-----------------------------------------------|-----------------------------	|---------------------------------	|
| apiUrl            | API url                                       | http://localhost:300          | http://localhost:3000           	|
| production        | production mode boolean                       |                             	| true / false                      | 
| storagePrefix     | storage prefix for LocalStorage elements      | meeting_organizer_             | meeting_organizer_                 |

#### Internalization

Go to `src/assets/i18n` to see the internalization specific JSON files.

## Development documentation

Go to `dev-docs/` to see the developmental related documentation for default logic.
