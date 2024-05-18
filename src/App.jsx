import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Config from "./pages/Config.jsx";
import Results from "./pages/Results.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route exact path="/config" element={<Config />} />
        <Route exact path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;