# Star Wars API project

## 1. Project Overview

- **Project Name:** Daniel's SWAPI api v3.0.0
- **Description:** This project supplies endpoints in the backend to interact with the SWAPI API (swapi.dev), and then dynamically renders changes to the frontend via React. My backend is setup to provide all four CRUD operation endpoints, where a user can add a character from the SWAPI database to a collection of characters, subsequently swap places between characters or remove them entirely.

The project is split up into two subdirectories: backend and frontend. Please see further instructions on how to setup each of the servers to run successfully.

## 2. Installation and Setup

- **Requirements:**
  Backend: The npm dependency packages are:
  axios, express and cors (with versions as per the package.json), as well as a set of gulp development dependencies found in the package.json file.
  Frontend: The npm dependency packages are:
  @hookform/resolvers,
  axios,
  bootstrap,
  react,
  react-dom,
  react-hook-form,
  zod,
  as well as a set of development dependencies automatically assigned by Vite.

- **Installation:**
  Backend:To setup the backend api, use your preferred code editor (after having changed directory to the folder of the downloaded project), and in the terminal run: npm i. This will install all the necessary packages in the downloaded project folder. Next navigate to the root folder, where the app.js file is located, and run node app.js (or nodemon app.js for persistent server). In your browser you can now go to http://localhost:3000/api/people to see the list of characters.
  Frontend: navigate to the frontend folder via terminal command (depending on where you are currently located): cd ../frontend/swapi-app-react. Here run: npm i (to install all necessary packages). Next run: npm run dev (to start development server). Now you can open you browser and go to: http://localhost:5173 (the assigned port for Vite projects). Now you are good to go with using the visual interface on port 5173 to interact with the backend, by adding/removing/editing/viewing characters.

## 3. Project Features

- Using the 4 CRUD operations (Create, Read, Update, Delete) with the app instance of the express package, this API, in relation with Postman or similar, allows the end user to add, remove, read, and swap places of characters.
- **app.get:** Retrieves the collection of characters, as an array of objects
- **app.post:** Makes a post request by adding a character to the colllection, embedded into which post request is first an axios.get request to retrieve the character data directly from swapi.dev/api/people
- **app.patch:** This request takes the input of the two character IDs from the URL, finds them in the collection, and then changes their position in the array.
- **app.delete:** The delete request requires a JSON object with a name property to be passed in the body of the request. That name is then checked in the database, and if it exists, the character is deleted.

## 4. Project Structure

The project is organized into the following directories:
swapi-app - the main root directory
-./backend

- ./src - all source code for the backend
- ...
- ./frontend
- ./swapi-app-react - main Vite folder for the React/frontend portion
- index.html - main html file that the React components link into
- ./src - all source code for the React portion
- .gitignore
- README.md - This README file
- ...

- backend and frontend:
  ./node_modules - contains the downloaded modules/packages for the project to run - however excluded from the respository due to space and not necessary as the package.json file is included.

## 5. Technologies Used

- **Languages:** JavaScript (frontend written mostly in TypeScript)
- **Frameworks/libraries:** Express.js, React
- **Tools:** Vite

## 6. Additional notes

### Dynamic retrieval of character images

Once a character is added to the list, React searches through the local frontend directory 'images' to find a file with a matching name, if found, the photo of the character is added to its visual card. These images were found on the repository listed at the bottom of the page.
