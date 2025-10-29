import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Checkout from "./pages/Checkout";
import Result from "./pages/Result";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="details/:id" element={<Details />} />
        <Route path="checkout/:id" element={<Checkout />} />
        <Route path="result" element={<Result />} />
      </Route>
    </Routes>
  );
}

export default App;
