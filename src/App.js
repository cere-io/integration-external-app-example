import './App.css';
import {Navbar, Footer} from './components';
import {Home, Profile, Item, Create, Login, Register} from './pages';
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/integration-external-app-example" element={<Home />} />
        <Route path="/integration-external-app-example/:item/:id" element={<Item />} />
        <Route path="/integration-external-app-example/create" element={<Create />} />
        <Route path="/integration-external-app-example/profile/:id" element={<Profile />} />
        <Route path="/integration-external-app-example/login" element={<Login />} />
        <Route path="/integration-external-app-example/register" element={<Register />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
