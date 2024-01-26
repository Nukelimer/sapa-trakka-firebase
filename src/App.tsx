import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SapaTrakka } from "./pages/expense-dashboard";
import { Validation } from "./pages/validation";
import Home from "./pages/home";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/validation" element={<Validation />} />
          <Route path="/expense" element={<SapaTrakka />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
