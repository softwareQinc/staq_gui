import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FileUpload from '../components/FileUpload';
import React, { useState } from 'react';
import httpService from '../services/http.service';
import { Stepper, Step, StepLabel, StepContent, Alert, Typography, Toolbar, StepButton, Divider } from '@mui/material';
import AlertComponent from '../components/Snackbar';
import ToolBox from '../components/ToolBox';

const steps = ['Staq Tool', "Upload your file", "Calculate", "Result"]
const CONTAINER_WIDTH = '80vw'
const CONTAINER_HEIGHT = '80vh'

function StaqTool() {
    const [isUploaded, setIsUploaded] = useState(false);
    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);
    const [showSnackbar, setShowSnackbar] = useState(false)
    const [snackbarData, setSnackbarData] = useState({})
    const [tools, setTools] = useState([]);
    const [alertData, setAlertData] = useState(null);

    //Stepper
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});

    const displaySnackbar = (msg, severity) => {
        setSnackbarData({ msg: msg, severity: severity })
        setShowSnackbar(true)
        setTimeout(() => {
            setShowSnackbar(false);
            setSnackbarData(null);
        }, 2000);
    }

    const handleNext = () => {
        if (tools.length === 0 && activeStep === 0) {
            setAlertData({
                severity: 'error',
                msg: 'Tools should be selected'
            })
            return;
        }
        if (!file && activeStep === 1) {
            setAlertData({
                severity: 'error',
                msg: 'File needs to be uploaded'
            })
            return;
        }

        if (activeStep === 2) {
            uploadData();
        } else {
            setAlertData(null)
            setActiveStep(activeStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
        setFile(null);
        setIsUploaded(false);
        setResult(null);
        setTools([])
    };

    //const handleReset = () => {
    //    setActiveStep(0);
    //};

    const handleChangeTools = (list) => {
        setTools(list);
    }

    const onFileUploaded = (e) => {
        if (!e) {
            setFile(null);
            setIsUploaded(false);
        } else {
            let file = e;
            setFile(file);
            setIsUploaded(true);
            displaySnackbar("file uploaded", 'success')
        }
    };


    const uploadData = (event) => {
        let formData = new FormData();
        formData.append("file", file);
        formData.append("config", JSON.stringify({ operations: tools }))
        httpService.post('/', formData)
            .then(async (res) => {
                setResult(res.data);
                displaySnackbar("Success", 'success')
                setActiveStep(activeStep + 1);
            })
            .catch((error) => {
                console.log(error);
                displaySnackbar("Something went wrong", 'error')
            })
            .finally();
    };

    // Download result as QASM
    const downloadResultAsQASM = () => {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(result));
        element.setAttribute('download', "result.qasm");
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    return (
        <>
            <Toolbar />
            <Grid container spacing={2} style={{ marginTop: '10px' }}>
                <Grid item sm={12} style={{
                    padding: 0, display: 'flex', flexDirection: 'row',
                    alignItems: 'center', justifyContent: 'space-between'
                }}>
                    <Box>
                        <Typography variant='h5'>Staq Tool</Typography>
                    </Box>
                    <Box mr={2} style={{ width: '40vw', height: '48px' }}>
                        {
                            alertData &&
                            <Alert variant="filled" severity={alertData.severity} >
                                {alertData.msg}
                            </Alert>

                        }
                    </Box>
                </Grid>
                <Grid item sm={2} style={{ display: 'flex' }}>
                    <Box mt={1} pr={1} pb={3}>
                        <Stepper activeStep={activeStep}
                            orientation="vertical"
                        >
                            {steps.map((label, index) => (
                                <Step key={label} completed={completed[index]}>
                                    <StepButton color="inherit" onClick={handleStep(index)}>
                                        {label}
                                    </StepButton>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>
                    <Divider orientation='vertical' />
                </Grid>
                <Grid item sm={9} style={{
                    height: CONTAINER_HEIGHT,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                }}>
                    <Box mt={1} pr={2} pl={2} >
                        {activeStep === 0 && (
                            <ToolBox tools={tools} onChangingList={handleChangeTools} />
                        )
                        }
                        {activeStep === 1 &&
                            <FileUpload uploaded={isUploaded} upFile={file} onFileUploaded={onFileUploaded} />
                        }
                        {activeStep === 2 &&
                            <>

                            </>
                        }
                        {result && activeStep === 3 &&
                            (<>
                                <Box mb={2} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Typography variant='h6'>Output</Typography>
                                    <Button variant="outlined" color="success" component="span" onClick={downloadResultAsQASM}>
                                        Download QASM file
                                    </Button>
                                </Box>
                                <Typography variant='body2' style={{ whiteSpace: "pre" }}>{result}</Typography>
                            </>)
                        }
                    </Box>
                    <Grid container spacing={2}>
                        <Grid item sm={6}>
                            <Box sx={{ mt: 1, mb: 2, textAlign: 'left' }}>
                                <Button
                                    variant="outlined"
                                    onClick={handleReset}
                                    sx={{ mt: 1, mr: 1 }}
                                >
                                    Reset
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item sm={6}>
                            <Box sx={{ mt: 1, mb: 2, textAlign: 'right' }}>
                                {activeStep !== 0 && (
                                    <Button
                                        onClick={handleBack}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        Back
                                    </Button>
                                )}
                                {!isLastStep() &&
                                    (
                                        <Button
                                            variant="contained"
                                            onClick={handleNext}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            {activeStep === 2 ? 'Calculate' : 'Continue'}
                                        </Button>
                                    )
                                }
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={1}></Grid>

                {/*<Grid item xs={12}>
                        <Box style={{ marginBottom: 10, height: 60 }}></Box>
                        {
                            result &&
                            <Box className="card-container">
                                <Box mb={2}>
                                    <Typography variant='h6'>Output</Typography>
                                    <Button variant="outlined" color="success" component="span" onClick={downloadResultAsQASM}>
                                        Download QASM file
                                    </Button>
                                </Box>
                                <Typography variant='body2' style={{ whiteSpace: "pre" }}>{result}</Typography>
                            </Box>
                        }
                    </Grid>*/}
            </Grid>
            {
                showSnackbar &&
                <AlertComponent open={showSnackbar} msg={snackbarData.msg} severity={snackbarData.severity} />
            }
        </>
    );
}

export default StaqTool;