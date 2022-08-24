import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layouts from "./Layout/Layouts";
import FeaturedProperties from "./pages/FeaturedProperties";
import PropertyDetail from "./pages/PropertyDetail";
import AdminDashboard from "./Layout/AdminDashboard";
import AllListing from "./pages/AllListing";
import { Navigate } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<AdminDashboard />}>
            <Route path="/dashboard/all-listing" element={<AllListing />} />
            <Route
              path="/dashboard"
              element={<Navigate replace to="/dashboard/all-listing" />}
            />
          </Route>
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
