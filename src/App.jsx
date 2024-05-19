import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Index from "./pages/Index.jsx";
import Configure from "./pages/Configure.jsx";
import Results from "./pages/Results.jsx";
import Navbar from "./components/Navbar.jsx";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4285F4",
    },
    secondary: {
      main: "#DB4437",
    },
    background: {
      default: "#F4F4F4",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Index />} />
          <Route exact path="/configure" element={<Configure />} />
          <Route exact path="/results" element={<Results />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;