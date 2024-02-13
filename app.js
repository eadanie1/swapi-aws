
import express from 'express';
import axios from 'axios';
import { routesLocal } from './src/scripts/local-characters.js';
import { validateInput, characterNotFound, addCharacter, 
  addCharacterRoute } from './src/scripts/add-character.js';
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



app.put('/api/people/swap/:id1/:id2', async (req, res) => {
  try {
    let characterId1 = req.params.id1;
    let characterId2 = req.params.id2;
    
    const index1 = collection.findIndex(c => c.id === parseInt(characterId1));
    const index2 = collection.findIndex(c => c.id === parseInt(characterId2));
    
    if (index1 === -1 || index2 === -1) {
      return res.status(404).json({error: 'One or both of the characters were not found in the collection'});
    }
    
    [collection[index1], collection[index2]] = [collection[index2], collection[index1]];

    const character1 = collection.find(c => c.id === parseInt(characterId1));
    const character2 = collection.find(c => c.id === parseInt(characterId2));

    const name1 = character1.name;
    const name2 = character2.name;
    
    res.json({message: `${name1} and ${name2} have been successfully swapped`});
  }
  catch (error) {
    console.error('Error', error.message);
  }
});

app.delete('/api/people/delete-character', async (req, res) => {
  try {
    const character = collection.find(c => c.name === req.body.name);
    
    const index = collection.findIndex(c => c.name === req.body.name);

    if (index === -1) {
      return res.status(404).json({error: 'Character not found in the collection'});
    }
    
    collection.splice(index, 1);
    res.json({message: `${req.body.name} was successfully deleted from the collection`});
  }
  catch (error) {
    console.error('Error', error.message);
  }
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`)
});

export default {collection}