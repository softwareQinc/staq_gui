import './App.css';
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Home from './pages/Home';

//function Copyright(props) {
//  return (
//    <Typography variant="body2" color="text.secondary" align="center" {...props}>
//      {'Copyright © '}
//      <Link color="inherit" href="https://softwareq.ca/">
//        softwareQ Inc.
//      </Link>{' '}
//      {new Date().getFullYear()}
//      {'.'}
//    </Typography>
//  );
//}

const theme = createTheme({
  palette: {
    background: {
      default: "#E7EBF0"
    }
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        {/*<Box sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          //justifyContent: 'center'
        }}>
          <img src={Logo} alt="softwareq" width={50} height={50} />
        </Box>*/}
        <Home />
        {/*<Copyright sx={{ mt: 5 }} />*/}
      </Container>
    </ThemeProvider>
  );
}

export default App;