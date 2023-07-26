import { Route, BrowserRouter, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Hero from "./pages/Hero";
import "./styles.css";
import Generate from "./pages/Generate";
import NavigationBar from "./layout/NavigationBar";
import Help from "./pages/Help";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Success from "./pages/Success";
import Footer from "./layout/Footer";
import Fail from "./pages/Fail";

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
        <Route path="success" element={<Success />} />
        <Route path="fail" element={<Fail />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}
