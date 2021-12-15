import logo from './logo.svg';
import server from "./apis/server"
import './App.css';


import React from 'react';

const App = () => {

  // useEffect(() => {
    server
    .get(`/`)
    .then(res => res)
    .then(data => console.log(data))

  // }, [])

  return (
    <div>
      
    </div>
  );
};

export default App;
