import { Route, BrowserRouter, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Hero from "./pages/Hero";
import "./styles.css";
import Generate from "./pages/Generate";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="login" element={<Login />} />
        <Route path="generate" element={<Generate />} />
      </Routes>
    </BrowserRouter>
  );
}
