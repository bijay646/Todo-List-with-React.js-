import './App.css';
import{BrowserRouter, Routes, Route} from 'react-router-dom'
import Navigation from './components/Navigation';
import Work from './components/Work';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {


  return (
    <BrowserRouter>
      <Navigation />
      <div className='guidenote'>
      <p style={{textAlign:'center'}}>Now, make easy notes of the task you need to do . You can choose either the Workplace list or Home list.</p>
      </div> 
      <Routes>
        <Route path="/work" element={<Work />}/>
        <Route exact path="/" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;


