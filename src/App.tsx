import { Routes, Route, Navigate } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/new" element={<div>Add Product Page</div>} />
      </Routes>
    </>
  );
}

export default App;
