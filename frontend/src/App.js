import './App.css';
import {BrowserRouter, Routes, Route} from "react-router";

import {FirebaseDatabaseProvider} from '@react-firebase/database'
import ViewItems from './components/ViewItems';
import AddItem from './components/AddItems';

function App() {
  return (
    <FirebaseDatabaseProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact Component={ViewItems}/>
          <Route path="/add-item" exact Component={AddItem}/>
        </Routes>
      </BrowserRouter>
    </FirebaseDatabaseProvider>
  );
}

export default App;
