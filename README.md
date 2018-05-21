# Schools API
A basic API for accessing names of districts and their schools in the US.

## Setup
Run `npm install` to install dependencies.

### Scripts
- 'npm start' Starts node app
- 'npm run import-db' Bootstraps data into DBs
- 'npm run delete-db' Removes all data from DBs

## Endpoints
### `GET /api/districts`
Gets all districts in the district DB.

### `GET /api/districts?search=`
Search all districts in the district DB.

_N.B. Use `_` to represent spaces in a district name._

### `GET /api/districts?state=`
Gets all districts for a given state in the district DB.

### `GET /api/schools`
Gets all schools in the school DB.

### `GET /api/schools?districtID=`
Gets all schools for a given district ID.


