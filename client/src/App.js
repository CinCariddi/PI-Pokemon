import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LandingPage from './componets/LandingPage'
import Home from './componets/Home';
import PokemonCreate from './componets/PokemonCreate'
import Detail from './componets/Detail'


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/create' element={<PokemonCreate/>}/>
          <Route path='/home/:id' element={<Detail/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
