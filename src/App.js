import React from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from './component/Dashboard';
import PrimarySearchAppBar from './component/Dashboard';
import Tableformat from './component/tableformat';
import Startingpage from './component/Startingpage';
import Route from './Router/route';
import Socketjs from './component/socketjs';
import abc from './component/abc';
import Message from './component/message';

function App() {
  return (
    <div className="App">
      {/* <abc /> */}
      {/* <Socketjs /> */}
    {/* <Tableformat ></Tableformat> */}
     <Route />
     {/* <Startingpage /> */}
     {/* <Startingpage /> */}
     {/* <Message /> */}
    </div>
  );
}

export default App;
