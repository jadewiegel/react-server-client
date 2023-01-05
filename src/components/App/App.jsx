// import {useState} from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';

// const creatureData = [
//     {id:1, name :'Unicorn', origin: 'Britain'},
//     {id:2, name: 'Sphinx', origin: 'Egypt'},
//     {id:3, name: 'Jackalope', origin: 'America'},
//     {id:4, name: 'Komodo Dragon', origin: 'Indonesia'}
//   ];

function App () {
  const [creatureList, setCreatureList] = useState([]);
  const [newCreatureName, setNewCreatureName] = useState('');
  const [newCreatureOrigin, setNewCreatureOrigin] = useState('');
  
  useEffect(() => {
    fetchCreatures();
  }, []);

  const fetchCreatures = () => {
    // axios({
    //   method: 'GET',
    //   url: '/creature'
    // }) this is one way to do it. and the following GET is another simpler way to do it.

    axios.get('/creature')

    .then((response) => {
      console.log('response from GET creatures', response.data);
      setCreatureList(response.data);
    })
    .catch((error) => {
      console.log('error getting creatures', error);
    });
  };

  const addCreature = (event) => {
    event.preventDefault();
    console.log('add creature clicked!', newCreatureName, newCreatureOrigin);
    //post request following
    axios({
      method: 'POST',
      url: '/creature',
      data: {
        name: newCreatureName,
        origin: newCreatureOrigin
      }
    })
    .then((response) => {
      console.log(response);
      setNewCreatureName('');
      setNewCreatureOrigin('');
      fetchCreatures();
    })
    .catch((error) => {
      console.log(error)
    });
  };

  return (
    <div>
     <h2>Add Creature</h2>
     <h4>{newCreatureName} {newCreatureOrigin}</h4>
     <form onSubmit={addCreature}>
        <label htmlFor="name">Name: </label>
        <input id="name" value={newCreatureName} onChange={(event) => setNewCreatureName(event.target.value)} />
        <label htmlFor="origin">Origin: </label>
        <input id="origin" value={newCreatureOrigin} onChange={(event) => setNewCreatureOrigin(event.target.value)} />
        <button type="submit">Add New Creature</button>
     </form>
     {/* {JSON.stringify(creatureList)} */}
     
      <ul>
        {creatureList.map(creature => (
          <li key={creature.id}>
            {creature.name} is from {creature.origin}
          </li>
        ))}
      </ul>
    </div>
  );

}

export default App
