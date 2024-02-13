
import { collection } from "../../app.js";

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

export default {  };