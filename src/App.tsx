import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ViewDetails from './components/ViewDetails';
import PasswordList from './components/PasswordList';
import PasswordGenerator from './components/Pwd';
import Login from './components/Login';
import Vault from './components/Vault';
import AddDetails from './components/AddDetails';
import UserEntry from './components/UserEntry';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/pwd" element={<PasswordGenerator />} />
        <Route path="/vault" element={<Vault />} />
        <Route path="/password/:id" element={<ViewDetails />} />
        <Route path="/password" element={<PasswordList />} />
        <Route path='/pwd/get-all'  Component={PasswordList} />
        <Route path='/pwd/get-all/:title' Component={ViewDetails} />
        <Route path='/add' Component={AddDetails} />
        <Route path = '/adduser'Component={UserEntry}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
