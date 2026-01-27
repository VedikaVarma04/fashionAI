import { HashRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/login.jsx";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import History from "./Pages/History";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </HashRouter>
  );
}
