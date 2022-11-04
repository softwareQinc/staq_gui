import './App.css';
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
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
  },
  typography: {
    fontFamily: ["Manrope", "sans-serif"].join(","),
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar variant="dense">
          <Typography variant="h6" component="div" textTransform={'uppercase'}>
            Staq
          </Typography>
        </Toolbar>
      </AppBar>
      <Router>
        <Box sx={{ display: 'flex' }}>
          {/*<Drawer
            variant="persistent"
            anchor='left'
            open={true}
          >
            <List>
              <Link to="/" className='link'>
                <ListItem button={true}>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Home"} />
                </ListItem>
              </Link>
              <Link to="/staqtool" className='link'>
                <ListItem button={true}>
                  <ListItemIcon>
                    <MenuIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Home"} />
                </ListItem>
              </Link>
            </List>
          </Drawer>*/}
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
      {/*<Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" >
          <Toolbar variant="dense">
            <Typography variant="h6" component="div" textTransform={'uppercase'}>
              Staq
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Home />
      </Container>*/}
    </ThemeProvider>
  );
}

export default App;