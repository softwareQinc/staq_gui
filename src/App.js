import './App.css';
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Home from './pages/Home';
import { AppBar, Box, createMuiTheme, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { BrowserRouter as Router, Switch, Routes, Route, Link, Navigate } from 'react-router-dom';
import StaqTool from './pages/StaqTool';
import DrawerComponent from './components/Drawer';
const theme = createTheme({
  palette: {
    background: {
      //default: "#E7EBF0",
    },
    //mode: 'dark'
  },
  typography: {
    fontFamily: ["Manrope", "sans-serif"].join(","),
    //fontSize: '14px',
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="sticky" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar variant="dense">
          <Typography variant="h6" component="div" textTransform={'uppercase'}>
            Staq
          </Typography>
        </Toolbar>
      </AppBar>
      <Router>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <DrawerComponent />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/staqtool' element={<StaqTool />} />
            <Route
              path="*"
              element={
                <Navigate to="/" />
              }
            />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;