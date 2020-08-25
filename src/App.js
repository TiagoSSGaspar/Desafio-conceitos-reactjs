import React, {useState, useEffect} from "react";
import api from 'services/api'

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(resp => {
      setRepositories(resp.data)
    })
  },[])

  async function handleAddRepository() {

   const resp = await api.post('repositories', {
      title:"Conceitos react,js",
    })

    const repository = resp.data

    setRepositories([...repositories, repository])
    
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(r => r.id !== id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map(repository => (
        <li key={repository.id}>

           {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
      ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
