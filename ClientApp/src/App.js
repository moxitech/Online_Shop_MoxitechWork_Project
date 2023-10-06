import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import InfoProduct from './InfoProduct';  
import Main from './Main';
import AddProduct from './AddProduct';
import ChangeProduct from './ChangeProduct';


export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="add" element={<AddProduct />} />
        <Route path='products/:id' element={<InfoProduct />} />
        <Route path='products/change/:id' element={<ChangeProduct />} />
        
      </Routes>
    </div>
  );
}