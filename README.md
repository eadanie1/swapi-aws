# Star Wars API project

## 1. Project Overview

- **Project Name:** Daniel's SWAPI api v3.0.0
- **Description:** This project is aimed at supplying endpoints for an end user to interact with the SWAPI API (Star Wars API). My API provides all four CRUD operation endpoints, where a user can add a character from the SWAPI database to a collection of characters, subsequently swap places between characters or remove them entirely.

## 2. Installation and Setup

- **Requirements:** The required npm packages as dependencies for this repository are express v4.18.2, and axios v1.6.4, as well as a set of gulp development dependencies found in the package.json file.

- **Installation:** To run this api, use your preferred code editor (after having changed directory to the folder of the downloaded project), and in the terminal run: npm i express axios. This will install express and axios packages in the downloaded project folder.

## 3. Project Features

- Using the 4 CRUD operations (Create, Read, Update, Delete) with the app instance of the express package, this API, in relation with Postman or similar, allows the end user to add, remove, read, and swap places of characters.
- **app.get:** Retrieves the collection of characters, as an array of objects
- **app.post:** Makes a post request by adding a character to the colllection, embedded into which post request is first an axios.get request to retrieve the character data directly from swapi.dev/api/people
- **app.put:** This request takes the input of the two character IDs from the URL, finds them in the collection, and then changes their position in the array.
- **app.delete:** The delete request requires a JSON object with a name property to be passed in the body of the request. That name is then checked in the database, and if it exists, the character is deleted.

## 4. Project Structure

The project is organized into the following directories:
./swapi-app - this is the main directory for the project, the following files are included in the main folder:

- .gitignore
- app.js - the main JavaScript file for the project, which is called in the terminal using nodemon to run the server and execute the HTTP requests (nodemon app.js in terminal)
- gulpefile.js - automates the workflow with gulp packages for minification etc
- package-lock.json
- package.json
- README.md - This README file

./node_modules - contains the downloaded modules/packages for the project to run - however excluded from the respository due to space and not necessary as the package.json file is included.

./src - contains the source code stored in this repository.

./dist - contains the output of the gulp tasks performed on the root, src/ and subfolders' files.

## 5. Technologies Used

- **Languages:** JavaScript
- **Frameworks/libraries:** Express.js
- **Tools:** Gulp automation package

## 6. Additional notes

### Gulpfile automation

I have created a gulpfile.js to minify HTML, CSS and JS, as well as compile .scss to .css. This gulpfile also watches for changes, and then writes all of the source code file in src/ subfolder into the dist/ subfolder (not in version control). This automates the process workflow and is easily done by simply running 'gulp' in the command line in the root directory. (gulp-uglify had to be replaced with gulp-terser, as gulp-uglify does not support ES6 at this time).
