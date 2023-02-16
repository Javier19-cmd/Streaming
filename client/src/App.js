import "../node_modules/rsuite/dist/rsuite.min.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registro" element={<Register />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/charts" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pantalla_principal/:usuario/:id" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;