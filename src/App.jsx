import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Configure from "./pages/Configure.jsx";
import Results from "./pages/Results.jsx";
import Navbar from "./components/Navbar.jsx";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4285F4',
    },
    secondary: {
      main: '#DB4437',
    },
    error: {
      main: '#F4B400',
    },
    warning: {
      main: '#0F9D58',
    },
    info: {
      main: '#4285F4',
    },
    success: {
      main: '#0F9D58',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
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