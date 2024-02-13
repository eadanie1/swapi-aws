
import express from 'express';
import axios from 'axios';
import { routesLocal } from './src/scripts/local-characters.js';
import { validateInput, characterNotFound, addCharacter, 
  addCharacterRoute } from './src/scripts/add-character.js';
import {  } from './src/scripts/move-character.js';
import deletionHandler from './src/scripts/delete-character.js';
const app = express();

app.use(express.json());


export const collection = [
  {id: 1, 
  name: 'Princess Leia'},
  {id: 2, 
  name: 'Yoda'}
];


routesLocal.forEach(route => {
  app.get(route.path, route.handler);
});

addCharacterRoute.forEach(route => {
  app.post(route.path, route.handler)
});





deletionHandler.deletionRoute.forEach(route => {
  app.delete(route.path, route.handler);
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`)
});

export default {collection}