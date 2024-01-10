const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const collection = [
    {id: 1, name: 'Princess Leia'},
    {id: 2, name: 'Yoda'}
];

app.get('/api/people/', async (req, res) => {
    try {
        res.json(collection);
    }
    catch (err) {
        console.error('Error reading file', err.message);
    }
})

app.get('/api/people/:id', async (req, res) => {
    try {
        const character = collection.find(c => c.id === parseInt(req.params.id));
        if (!character) {
            res.status(404).json({error: 'No character exists with the given ID'});
        }
        res.json(character);
    }
    catch (err) {
        console.error('Error reading file', err.message);
    }
})

app.post('/api/people/add-character', async (req, res) => {
    try {
    let character = req.body.name;
    if (!character) {
        return res.status(400).json({error: 'Character name is required'});
    }
    
    const swapiUrl = `https://swapi.dev/api/people/?search=${character}`;
    const swapiResponse = await axios.get(swapiUrl);
    
    if (swapiResponse.data.count === 0) {
        return res.status(404).json({error: 'The character does not exist in the SWAPI database'});
    }
    
    const characterFull = {
        id: collection.length + 1,
        name: swapiResponse.data.results[0].name
    };

    collection.push(characterFull);
    res.json({message: `${character} has been added to the collection`});
}
catch (err) {
    console.error('Error', err.messsage);
}
});

app.put('/api/people/swap/:id1/:id2', async (req, res) => {
    try {
        let characterId1 = req.params.id1;
        let characterId2 = req.params.id2;
        
        const index1 = collection.findIndex(c => c.id === parseInt(characterId1));
        const index2 = collection.findIndex(c => c.id === parseInt(characterId2));
        
        if (index1 === -1 || index2 === -1) {
            res.status(404).json({error: 'One or both of the characters were not found in the collection'});
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
        
        // if (!character) {
        //     return res.status(400).json({error: 'The character name is required for deletion'});
        // }
        
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