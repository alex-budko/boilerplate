import { Route, BrowserRouter, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Hero from "./pages/Hero";
import "./styles.css";
import Generate from "./pages/Generate";
import NavigationBar from "./layout/NavigationBar";
import Help from "./pages/Help";
import Pricing from "./pages/Pricing";
import About from "./pages/About";

export default function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="login" element={<Login />} />
        <Route path="generate" element={<Generate />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="help" element={<Help />} />
        <Route path="about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
