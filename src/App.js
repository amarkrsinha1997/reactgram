import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Tab } from './Component/Base/Tabs/Tab';
import { Tabs } from './Component/Base/Tabs/Tabs';

function App() {
  return (
    <div className="App">
     <Tabs>
       <Tab> 
        Like 1
       </Tab>
       <Tab> 
        Like 1
       </Tab>
     </Tabs>
    </div>
  );
}

export default App;
