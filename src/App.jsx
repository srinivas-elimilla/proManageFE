import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import { Dashboard } from "./components/Dashboard";
import Public from "./components/Public";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/:taskId" element={<Public />} />
      </Routes>
    </Router>
  );
}

export default App;
