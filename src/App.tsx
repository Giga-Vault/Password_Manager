import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ViewDetails from './components/ViewDetails';
import PasswordGenerator from './components/Pwd';
import Login from './components/Login';
import Vault from './components/Vault';
import AddDetails from './components/AddDetails';
import UserEntry from './components/UserEntry';
import Update from './components/Update'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/pwd/:uid" element={<PasswordGenerator />} />
        <Route path="/pwd/get-all/:uid" element={<Vault />} />
        <Route path='/pwd/get-details/:title/:uid' Component={ViewDetails} />
        <Route path='/add/:uid' Component={AddDetails} />
        <Route path='/pwd/update/:id/:uid' Component={Update}/>
        <Route path='/signup' Component={UserEntry}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
