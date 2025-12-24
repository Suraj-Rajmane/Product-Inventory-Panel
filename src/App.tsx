import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route path="/products" element={<div>Products Page</div>} />
        <Route path="/products/new" element={<div>Add Product Page</div>} />
      </Routes>
    </>
  );
}

export default App;
