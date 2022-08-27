import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layouts from "./Layout/Layouts";
import FeaturedProperties from "./pages/FeaturedProperties";
import PropertyDetail from "./pages/PropertyDetail";
import AllListing from "./pages/AllListing";
import { Navigate } from "react-router-dom";
import Dashboard from "./Layout/Dashboard";
import CreateListing from "./pages/CreateListing";
import FavouriteListing from "./pages/FavouriteListing";
import Search from "./pages/Search";
import Forgot from "./pages/Forgot";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="/dashboard/all-listing" element={<AllListing />} />
          <Route path="/dashboard/create-listing" element={<CreateListing />} />
          <Route
            path="/dashboard/favourite-listing"
            element={<FavouriteListing />}
          />
          <Route
            path="/dashboard"
            element={<Navigate replace to="/dashboard/all-listing" />}
          />
        </Route>
        <Route path="/" element={<Layouts />}>
          <Route path="/" element={<Home />} />
          <Route path="/query" element={<Search />} />
          <Route path="/featured" element={<FeaturedProperties />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
