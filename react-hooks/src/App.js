import './App.css';
import { TreesContext, useTrees } from '.';
import { useContext } from 'react';


function App() {
  const { trees } = useTrees();
  return (
    <div>
      <h1>
        Trees I've heard of
      </h1>
      <ul>
        {trees.map((tree) => {
          return (
            <li key={tree.id}>{tree.type}</li>
          )
        })}
      </ul>
    </div>
  )
}

export default App;
