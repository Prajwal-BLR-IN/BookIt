import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Checkout from "./pages/Checkout";
import Results from "./pages/Results";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="details/:id" element={<Details />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="confirmation" element={<Results />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
