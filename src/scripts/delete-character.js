
import { collection } from '../../app.js';

export async function validateDeletion(collection, req, res) {
  const index = collection.findIndex(c => c.name === req.body.name);
  
  if (index !== -1) {
    collection.splice(index, 1);
    res.json({message: `${req.body.name} was successfully deleted from the collection`});
  } else {
    res.status(404).json({error: 'Character not found in the collection'});
  } 
}

export const deletionRoute = [
  {
    path: '/api/people/delete-character',
    handler: async (req, res) => {
      try {
        await validateDeletion(collection, req, res);
      }
      catch (error) {
        console.error('Error', error.message);
      }
    }
  }
];

export default { validateDeletion, deletionRoute };