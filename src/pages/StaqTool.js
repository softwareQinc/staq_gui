import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FileUpload from '../components/FileUpload';
import React, { useState } from 'react';
import httpService from '../services/http.service';
import { Stepper, Step, StepLabel, StepContent } from '@mui/material';
import AlertComponent from '../components/Snackbar';
import ToolBox from '../components/ToolBox';

function StaqTool() {

    //const tools = TOOLS_CONSTANT;
    const [isUploaded, setIsUploaded] = useState(false);
    const [data, setData] = useState({});
    const [result, setResult] = useState(null);
    const [showSnackbar, setShowSnackbar] = useState(false)
    const [snackbarData, setSnackbarData] = useState({})
    const [activeStep, setActiveStep] = React.useState(0);
    const [tools, setTools] = useState([]);

    const displaySnackbar = (msg, severity) => {
        setSnackbarData({ msg: msg, severity: severity })
        setShowSnackbar(true)
        setTimeout(() => {
            setShowSnackbar(false);
            setSnackbarData(null);
        }, 2000);
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    //const handleReset = () => {
    //    setActiveStep(0);
    //};

    const handleChangeTools = (list) => {
        console.log(list)
        setTools(list);
    }

    const onFileUploaded = (e) => {
        console.log(e);
        let file = e;
        setData(file);
        setIsUploaded(true);
        displaySnackbar("file uploaded", 'success')
    };


    const uploadData = (event) => {
        console.log(event);
        let formData = new FormData();
        formData.append("file", data);
        formData.append("config", JSON.stringify({ operations: tools }))
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
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Box className="card-container">
                        <Stepper
                            activeStep={activeStep}
                            orientation="vertical">
                            <Step>
                                <StepLabel
                                //optional={
                                //    index === 2 ? (
                                //        <Typography variant="caption">Last step</Typography>
                                //    ) : null
                                //}
                                >
                                    Staq Tool
                                </StepLabel>
                                <StepContent>
                                    {/*<Typography>{step.description}</Typography>*/}
                                    <ToolBox onChangingList={handleChangeTools} />
                                    <Box sx={{ mb: 2 }}>
                                        <div>
                                            <Button
                                                variant="contained"
                                                onClick={handleNext}
                                                sx={{ mt: 1, mr: 1 }}
                                            >
                                                Continue
                                            </Button>
                                            {/*<Button
                                                disabled={index === 0}
                                                //onClick={handleBack}
                                                sx={{ mt: 1, mr: 1 }}
                                            >
                                                Back
                                            </Button>*/}
                                        </div>
                                    </Box>
                                </StepContent>
                            </Step>
                            <Step>
                                <StepLabel
                                //optional={
                                //    <Typography variant="caption">Last step</Typography>
                                //}
                                >
                                    Upload File
                                </StepLabel>
                                <StepContent>
                                    {/*<Typography>{step.description}</Typography>*/}
                                    <FileUpload onFileUploaded={onFileUploaded} />
                                    <Box sx={{ mb: 2 }}>
                                        <div>
                                            <Button
                                                variant="contained"
                                                onClick={handleNext}
                                                sx={{ mt: 1, mr: 1 }}
                                            >
                                                Continue
                                            </Button>
                                            <Button
                                                onClick={handleBack}
                                                sx={{ mt: 1, mr: 1 }}
                                            >
                                                Back
                                            </Button>
                                        </div>
                                    </Box>
                                </StepContent>
                            </Step>
                            <Step>
                                <StepLabel
                                //optional={
                                //    <Typography variant="caption">Last step</Typography>
                                //}
                                >
                                    Select Output Type
                                </StepLabel>
                                <StepContent>
                                    {/*<Typography>{step.description}</Typography>*/}
                                    <Box sx={{ mb: 2 }}>
                                        <div>
                                            <Button
                                                variant="contained"
                                                onClick={uploadData}
                                                sx={{ mt: 1, mr: 1 }}
                                            >
                                                Calculate
                                            </Button>
                                            <Button
                                                onClick={handleBack}
                                                sx={{ mt: 1, mr: 1 }}
                                            >
                                                Back
                                            </Button>
                                        </div>
                                    </Box>
                                </StepContent>
                            </Step>
                        </Stepper>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box className="card-container">
                        <div>{result}</div>
                    </Box>
                </Grid>
            </Grid>
            {
                showSnackbar &&
                <AlertComponent open={showSnackbar} msg={snackbarData.msg} severity={snackbarData.severity} />
            }
        </>
    );
}

export default StaqTool;