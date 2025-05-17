import './App.css';
import {BrowserRouter, Routes, Route} from "react-router";

import {FirebaseDatabaseProvider} from '@react-firebase/database'
import ViewAndManageItems from './components/ViewAndManageItems';
import AddItem from './components/AddItems';

function App() {
  return (
    <FirebaseDatabaseProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact Component={ViewAndManageItems}/>
          <Route path="/add-item" exact Component={AddItem}/>
        </Routes>
      </BrowserRouter>
    </FirebaseDatabaseProvider>
  );
}

export default App;
