import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function App() {
  const [name, setName] = useState("Jan");
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    document.title = `Celebrate ${name}`
  }, [name]);

  useEffect(() => {
    console.log(`The user is: ${admin ? "admin" : "not admin"}.`)
  }, [admin]);

  return (
    <section>
      <p>Congratulations {name}!</p>
      <button onClick={() => setName("Will")}>Change Winner</button>
      <p>{admin ? "logged in" : "not logged in"}</p>
      <button onClick={() => setAdmin(true)}>Log In</button>
    </section>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);