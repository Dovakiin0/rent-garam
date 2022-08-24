import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layouts from "./Layout/Layouts";
import FeaturedProperties from "./pages/FeaturedProperties";
import PropertyDetail from "./pages/PropertyDetail";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Layouts />}>
            <Route path="/" element={<Home />} />
            <Route path="/featured" element={<FeaturedProperties />} />
            <Route path="/property/:id" element={<PropertyDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
