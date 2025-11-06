import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail";
import Navbar from "./components/Navbar";


function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/details/:id" element={<ProductDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
