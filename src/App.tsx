import { Routes, Route, Navigate } from "react-router-dom";
import TestQuery from "./TestQuery";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route path="/products" element={<div>Products Page</div>} />
        <Route path="/products/new" element={<div>Add Product Page</div>} />
      </Routes>
      <TestQuery></TestQuery>
    </>
  );
}

export default App;
