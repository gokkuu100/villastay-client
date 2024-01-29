import './App.css';
import { Routes, Route } from "react-router-dom"
import SignIn from './components/SignIn';
import Home from './components/Home';
import CreateProperty from './components/CreateProperty';
import GetProperties from './components/GetProperties';
import SingleProperty from './components/SingleProperty';
import Booking from './components/Booking';
import Reviews from './components/Reviews';
import Footer from './components/Footer';
import SignUp from './components/SignUp';


function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/home' element={<Home />} />
        <Route path='/create' element={<CreateProperty />} />
        <Route path='/villas' element={<GetProperties />} />
        <Route path='/villas/:id' element={<SingleProperty />} />
        <Route path='/booking/:id' element={<Booking />} />
        <Route path='/reviews' element={<Reviews />} />
        <Route path='/footer' element={<Footer />} />
      </Routes>
    </div>
  );
}

export default App;
