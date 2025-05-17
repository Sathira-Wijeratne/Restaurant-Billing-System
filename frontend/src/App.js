import './App.css';
import {BrowserRouter, Routes, Route} from "react-router";

import {FirebaseDatabaseProvider} from '@react-firebase/database'
import ViewAndManageItems from './components/ViewAndManageItems';
function App() {
  return (
    <FirebaseDatabaseProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact Component={ViewAndManageItems}/>
        </Routes>
      </BrowserRouter>
    </FirebaseDatabaseProvider>
  );
}

export default App;
