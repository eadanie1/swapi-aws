
import express from 'express';
import axios from 'axios';
const app = express();

app.use(express.json());

const collection = [
  {id: 1, 
  name: 'Princess Leia'},
  {id: 2, 
  name: 'Yoda'}
];

function getFullCollectionLocally() {
  return collection;
}

function getIndividualCharacterLocally(req, res) {
  const character = collection.find(c => c.id === parseInt(req.params.id));
  if (!character) {
    return res.status(404).json({error: 'No character exists with the given ID'});
  }
  return character;
}

app.get('/api/people/', async (req, res) => {
  try {
    const fullListOfCharacters = getFullCollectionLocally();
    res.json(fullListOfCharacters);
  }
  catch (err) {
    console.error('Error reading file', err.message);
    res.status(500).json({ error: 'Internal Server Error'});
  }
});

app.get('/api/people/:id', async (req, res) => {
  try {
    const singleCharacter = getIndividualCharacterLocally(req, res);
    if (singleCharacter) {
      res.json(singleCharacter);
    }
  }
  catch (err) {
    console.error('Error reading file', err.message);
  }
});

async function validateInput(req, res) {
  let character = req.body.name;
  if (!character || !(typeof character === 'string')) {
    return res.status(400).json({error: 'A valid string character name is required'});
  }
  return character;
}

async function characterNotFound(req, res) {
  if (swapiResponse.data.count === 0) {
    res.status(404).json({error: 'The character does not exist in the SWAPI database'})
    return true;
  }
  return false;
}

async function addCharacter(req, res) {
  collection.push(characterObject);
  res.json({message: `${validatedCharacterInput} has been added to the collection`});
}

app.post('/api/people/add-character', async (req, res) => {
  try {
    const validatedCharacterInput = await validateInput(req, res);

    const swapiUrl = `https://swapi.dev/api/people/?search=${validatedCharacterInput}`;
    const swapiResponse = await axios.get(swapiUrl);
    
    await characterNotFound(req, res);
    
    const characterObject = {
      id: collection.length + 1,
      name: swapiResponse.data.results[0].name
    };

    await addCharacter(req, res);
}
  catch (err) {
    console.error('Error', err.messsage);
}
});

// app.post('/api/people/add-character', async (req, res) => {
//   try {
//   let character = req.body.name;
//   if (!character || !(typeof character === 'string')) {
//     return res.status(400).json({error: 'A valid string character name is required'});
//   }
  
//   const swapiUrl = `https://swapi.dev/api/people/?search=${character}`;
//   const swapiResponse = await axios.get(swapiUrl);
  
//   if (swapiResponse.data.count === 0) {
//     return res.status(404).json({error: 'The character does not exist in the SWAPI database'});
//   }
  
//   const characterFull = {
//     id: collection.length + 1,
//     name: swapiResponse.data.results[0].name
//   };

//   collection.push(characterFull);
//   res.json({message: `${character} has been added to the collection`});
// }
// catch (err) {
//   console.error('Error', err.messsage);
// }
// });

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