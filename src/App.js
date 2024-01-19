import './App.css';
import { Routes, Route } from "react-router-dom"
import SignIn from './components/SignIn';
import Home from './components/Home';
import CreateProperty from './components/CreateProperty';
import GetProperties from './components/GetProperties';
import SingleProperty from './components/SingleProperty';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/home' element={<Home />} />
        <Route path='/create' element={<CreateProperty />} />
        <Route path='/villas' element={<GetProperties />} />
        <Route path='/villas/:id' element={<SingleProperty />} />
      </Routes>
    </div>
  );
}

export default App;
