import React from "react"; 
import {Home} from './pages/Home'
import {Postal} from './pages/Postal'
import {NotFound} from './pages/NotFound'
import {Route, Routes} from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path = "/" element={<Home/>}/>
      <Route path = "/postal/:key" element={<Postal/>}/>
      <Route path = "*" element={<NotFound/>}/>
    </Routes>
  );
}

export default App;
