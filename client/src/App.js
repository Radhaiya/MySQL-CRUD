
import './App.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home'
import Addedit from './pages/Addedit';
import Viewpage from './pages/Viewpage';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>CRUD App</h1>
        <ToastContainer position='top-center' />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/Addcontact' element={<Addedit  />}></Route>
          <Route path='/update/:id' element={<Addedit />}></Route>
          <Route path='/view/:id' element={<Viewpage />}></Route>
          
        </Routes>
      </div>
    </BrowserRouter>

  );
}


export default App;
