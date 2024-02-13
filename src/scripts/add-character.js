
import axios from 'axios';
import { collection } from '../../app.js';

export async function validateInput(req, res) {
  let character = req.body.name;
  if (!character || !(typeof character === 'string')) {
    return res.status(400).json({error: 'A valid string character name is required'});
  }
  return character;
}

export async function characterNotFound(swapiResponse, res) {
  return swapiResponse.data.count === 0;
}

export async function addCharacter(characterObject, validatedCharacterInput, req, res) {
  collection.push(characterObject);
  res.json({message: `${validatedCharacterInput} has been added to the collection`});
}

export const addCharacterRoute = [
  {path: '/api/people/add-character',
  handler: async (req, res) => {
    try {
      const validatedCharacterInput = await validateInput(req, res);
      
      const swapiUrl = `https://swapi.dev/api/people/?search=${validatedCharacterInput}`;
      const swapiResponse = await axios.get(swapiUrl);
      
      if (await characterNotFound(swapiResponse, res)) {
        res.status(404).json({error: 'The character does not exist in the SWAPI database'})
      }
  
      const characterObject = {
        id: collection.length + 1,
        name: swapiResponse.data.results[0].name
      };
  
      await addCharacter(characterObject, validatedCharacterInput, req, res);
    }
    catch (err) {
      console.error('Error', err.messsage);
    }
  }}
];


export default { validateInput, characterNotFound, addCharacter, addCharacterRoute };