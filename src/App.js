import './App.css';
import { Routes, Route } from "react-router-dom"
import SignIn from './components/SignIn';
import Home from './components/Home';
import CreateProperty from './components/CreateProperty';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/home' element={<Home />} />
        <Route path='/create' element={<CreateProperty />} />
      </Routes>
    </div>
  );
}

export default App;
