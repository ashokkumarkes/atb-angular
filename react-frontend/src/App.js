import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail";


function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/details/:id" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
