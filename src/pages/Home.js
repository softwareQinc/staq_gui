import { Avatar, Box, Button, Container, Link, Toolbar, Typography } from '@mui/material';
import * as React from 'react';
import StaqTool from './StaqTool';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import logo from '../assets/softwareQ.png'
import { useNavigate } from 'react-router-dom';
function Home() {
    const navigate = useNavigate();
    return (
        <Container maxWidth="sm">
            <Toolbar />
            <Box style={{ textAlign: 'center' }} mb={2}>
                {/*<Avatar alt="softwareQ" src={require('../assets/softwareq.jpg')} />*/}
                <img src={logo} alt="softwareQ" style={{ width: '50%', marginBottom: '5px' }} />
                <Typography variant='h6'>staq - A full-stack quantum processing toolkit</Typography>
            </Box>
            <Box style={{ textAlign: 'justify' }}>
                <Typography paragraph>staq is a modern C++17 library for the synthesis, transformation, optimization and compilation of quantum circuits. It is usable either through the provided binary tools, or as a header-only library that can be included to provide direct support for parsing & manipulating circuits written in the <Link underline='none' target="_blank" rel="noreferrer" href="https://github.com/openqasm/openqasm">OpenQASM</Link> circuit description language.</Typography>
                <Typography paragraph> Inspired by Clang, staq is designed to manipulate OpenQASM syntax trees directly, rather than through an intermediate representation which makes retrieving the original source code impossible. In particular, OpenQASM circuits can be inspected and transformed (in most cases) without losing the original source structure. This makes staq ideally suited for source-to-source transformations, where only specific changes are desired. Likewise, this allows translations to other common circuit description languages and libraries to closely follow the OpenQASM source.</Typography>
                <Typography paragraph>Check out the <Link underline='none' target="_blank" rel="noreferrer" href="https://github.com/softwareQinc/staq/wiki">Wiki</Link> for more information about the library and included tools.</Typography>
            </Box>
            <Box mt={2} style={{ textAlign: 'center' }}>
                <Button variant="contained" color='secondary' endIcon={<ArrowForwardIcon />} onClick={() => navigate('/staqtool')}>Get Started</Button>
            </Box>
            {/*<StaqTool />*/}
        </Container>
    );
}

export default Home;