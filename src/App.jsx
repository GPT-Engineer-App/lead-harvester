import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Configure from "./pages/Configure.jsx";
import Results from "./pages/Results.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route exact path="/configure" element={<Configure />} />
        <Route exact path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;