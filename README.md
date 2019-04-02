# Raf Reading log
This version uses React, Redux, Express, Passport, and PostgreSQL (a full list of dependencies can be found in `package.json`).

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Create database and table

Please refer to database.SQL file to create tables.


## Development Setup Instructions

* Run `npm install`
* Start postgres if not running already by using `brew services start postgresql`
* Run `npm run server`
* Run `npm run client`
* Navigate to `localhost:3000`



## Production Build

run `npm run build` in terminal. This will create a build folder that contains the code Heroku will be pointed at. You can test this build by typing `npm start`.
* Start postgres if not running already by using `brew services start postgresql`
* Run `npm start`
* Navigate to `localhost:5000`

## Lay of the Land

* `src/` contains the React application
* `public/` contains static assets for the client-side
* `build/` after you build the project, contains the transpiled code from `src/` and `public/` that will be viewed on the        production site
* `server/` contains the Express App

* src/components
  * App/App
  * Footer/Footer
  * Nav/Nav
  * studentInfoPage/StudentInfoPage
  * StudentDetailPage/StudentDetailPage
  * TeacherPage/TeacherPage
  * UserPage/UserPage
  * LoginPage/LoginPage
  * RegisterPage/RegisterPage
  * LogOutButton/LogOutButton
  * ProtectedRoute/ProtectedRoute

