import * as React from 'react';
//import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
//import TextField from '@mui/material/TextField';
//import FormControlLabel from '@mui/material/FormControlLabel';
//import Checkbox from '@mui/material/Checkbox';
//import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FileUpload from '../components/FileUpload';
import { useState } from 'react';
import httpService from '../services/http.service';
import { Typography } from '@mui/material';
import StaqTool from './StaqTool';

function Home() {

    const [isUploaded, setIsUploaded] = useState(false);
    const [data, setData] = useState({});
    const [result, setResult] = useState(null);
    const onFileUploaded = (e) => {
        console.log(e);
        let file = e;
        setData(file);
        setIsUploaded(true);
    };

    const uploadData = (event) => {
        console.log(event);
        let formData = new FormData();
        formData.append("file", data);

        httpService.post('/', formData)
            .then(async (res) => {
                console.log(res);
                setResult(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally();
    };

    return (
        <>
            <StaqTool />
            {/*<Box component="form" noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                        <FileUpload onFileUploaded={onFileUploaded} />
                    </Grid>
                </Grid>
                {isUploaded &&
                    <Box>
                        <Grid item xs={12} sm={12}>
                            Uploaded
                        </Grid>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={uploadData}
                        >
                            Submit
                        </Button>
                        {result &&
                            <Typography variant="body1">{result}</Typography>
                        }
                    </Box>}
            </Box>*/}
        </>
    );
}

export default Home;