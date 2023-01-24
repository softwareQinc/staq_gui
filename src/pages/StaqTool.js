import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FileUpload from '../components/FileUpload';
import React, { useState } from 'react';
import httpService from '../services/http.service';
import { Stepper, Step, StepLabel, StepContent, Alert, Typography, Toolbar, StepButton, Divider, RadioGroup, Radio, FormControlLabel, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@mui/material';
import AlertComponent from '../components/Snackbar';
import ToolBox from '../components/ToolBox';
import OutputScreen from "../components/OutputScreen";
import ConfigSelect from "../components/ConfigSelect";
import JSONOutputScreen from "../components/JSONOutput";
import JSONFileUpload from "../components/JSONFileUpload";

const steps = ['Upload file', "Select staq tools", "Optimize", "Lattice Surgery (optional)", "Quantum Resource Estimation (optional)"]
const CONTAINER_WIDTH = '80vw'
const CONTAINER_HEIGHT = '80vh'

function StaqTool() {
    const [isUploaded, setIsUploaded] = useState(false);
    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);
    const [latticeResult, setLatticeResult] = useState(null);
    const [qreResult, setQreResult] = useState(null);
    const [outputConfig, setOutputConfig] = useState({
        mode: 'lattice_surgery',
        qre: false,
        config: {
            scheme: 'fast',
            p_g: "0.001",
            cycle_time: "0.00001"
        }
    })
    const [showSnackbar, setShowSnackbar] = useState(false)
    const [snackbarData, setSnackbarData] = useState({})
    const [tools, setTools] = useState([]);
    const [alertData, setAlertData] = useState(null);

    //Stepper
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});

    //JSON File Dialog
    const [openFileDialog, setOpenFileDialog] = useState(false)

    const displaySnackbar = (msg, severity) => {
        setSnackbarData({ msg: msg, severity: severity })
        setShowSnackbar(true)
        setTimeout(() => {
            setShowSnackbar(false);
            setSnackbarData(null);
        }, 2000);
    }

    const handleNext = () => {
        if (!file && activeStep === 0) {
            setAlertData({
                severity: 'error',
                msg: 'File needs to be uploaded'
            })
            return;
        }
        else if (activeStep == 1) {
            getQASMResults();
        }
        else if (activeStep == 2) {
            getLatticeSurgeryResults();
        }
        else if (activeStep == 4) {
            if (!validateResourceConfig(outputConfig.config)) { return; }
            setOpenFileDialog(true)
            //getQuantumResourceEstimationResults()
        }
        else {
            setAlertData(null)
            setActiveStep(activeStep + 1);
        }
    };

    const validateResourceConfig = (resourceConfig) => {
        if (!resourceConfig || !resourceConfig.scheme || !resourceConfig.p_g || !resourceConfig.cycle_time) {
            setAlertData({
                severity: 'error',
                msg: 'All configuration must be entered'
            })
            return false;
        }

        if (Number(resourceConfig.p_g) > 1e-2 || Number(resourceConfig.p_g) < 1e-5) {
            setAlertData({
                severity: 'error',
                msg: 'p_g must be between 1e-2 and 1e-5'
            })
            return false;
        }


        if (Number(resourceConfig.cycle_time) > 1e-2 || Number(resourceConfig.cycle_time) < 1e-8) {
            setAlertData({
                severity: 'error',
                msg: 'cycle time must be between 1e-2 and 1e-8'
            })
            return false;
        }

        if (Number(resourceConfig.p_g) != 0.001 && Number(resourceConfig.p_g) != 0.0001) {
            setAlertData({
                severity: 'error',
                msg: 'p_g must either be 0.001 or 0.0001'
            })
            return false;
        }
        setAlertData(null)
        return true
    }

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


    const getQASMResults = () => {
        let formData = new FormData();
        formData.append("file", file);
        formData.append("config", JSON.stringify({ operations: tools }))
        httpService.post('staq/qasm', formData)
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

    const getLatticeSurgeryResults = () => {
        let formData = new FormData();
        formData.append("file", file);
        httpService.post('staq/lattice_surgery', formData)
            .then(async (res) => {
                setLatticeResult(res.data);
                displaySnackbar("Success", 'success')
                setActiveStep(activeStep + 1);
            })
            .catch((error) => {
                console.log(error);
                displaySnackbar("Something went wrong", 'error')
            })
            .finally();
    };

    const getQuantumResourceEstimationResults = () => {
        let formData = new FormData();
        formData.append("file", file);
        formData.append("config", JSON.stringify({ config: outputConfig.config }))
        httpService.post('staq/qre', formData)
            .then(async (res) => {
                if (res.statusCode == 200) {
                    setQreResult(res.data);
                    displaySnackbar("Success", 'success')
                    //setActiveStep(activeStep + 1);
                } else {
                    displaySnackbar("Something went wrong", 'error')
                }
            })
            .catch((error) => {
                console.log(error);
                displaySnackbar("Something went wrong", 'error')
            })
            .finally();
    };

    const getQuantumResourceEstimationResultsByJSON = (uploadedFile) => {
        let formData = new FormData();
        formData.append("file", uploadedFile);
        formData.append("config", JSON.stringify({ config: outputConfig.config }))
        httpService.post('staq/qre/json', formData)
            .then(async (res) => {
                if (res.statusCode == 200) {
                    setQreResult(res.data);
                    displaySnackbar("Success", 'success')
                    //setActiveStep(activeStep + 1);
                } else if (res.statusCode == 400) {
                    displaySnackbar("Wrong JSON format", 'error')
                } else {
                    displaySnackbar("Something went wrong", 'error')
                }
            })
            .catch((error) => {
                console.log(error);
                displaySnackbar("Something went wrong", 'error')
            })
            .finally();
    };

    const updateFileDialog = (e) => {
        if (!e) {
            setOpenFileDialog(false)
        } else {
            if (!e.status) {
                getQuantumResourceEstimationResults();
            } else {
                if (!e.file) {
                    displaySnackbar("Please upload JSON", 'error')
                    return;
                }
                getQuantumResourceEstimationResultsByJSON(e.file)
            }
            setOpenFileDialog(false)
        }
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
                            <FileUpload uploaded={isUploaded} upFile={file} onFileUploaded={onFileUploaded} />
                        )
                        }
                        {activeStep === 1 &&
                            <ToolBox tools={tools} onChangingList={handleChangeTools} />
                        }
                        {activeStep === 2 &&
                            <OutputScreen result={result} />
                        }
                        {result && activeStep === 3 &&
                            <>
                                <Typography variant='h6'>Lattice Surgery</Typography>
                                <JSONOutputScreen result={latticeResult} />
                            </>
                        }
                        {result && activeStep === 4 &&
                            <>
                                <ConfigSelect setConfigType={(e) => {
                                    setOutputConfig(e);
                                }} />
                                <JSONOutputScreen result={qreResult} height={'30vh'} />
                                <JSONFileDialog open={openFileDialog} updateFileDialog={updateFileDialog} />
                            </>
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
                                            {activeStep === 2 ? 'Lattice Surgery (Optional)' : 'Continue'}
                                        </Button>
                                    )
                                }
                                {isLastStep() &&
                                    (
                                        <Button
                                            variant="contained"
                                            onClick={handleNext}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            Calculate
                                        </Button>
                                    )
                                }
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={1}></Grid>
            </Grid>
            {
                showSnackbar &&
                <AlertComponent open={showSnackbar} msg={snackbarData.msg} severity={snackbarData.severity} />
            }
        </>
    );
}

function JSONFileDialog({ open, updateFileDialog, ...props }) {
    const [isUploaded, setIsUploaded] = useState(false);
    const [file, setFile] = useState(null);

    const onFileUploaded = (e) => {
        if (!e) {
            setFile(null);
            setIsUploaded(false);
        } else {
            let file = e;
            setFile(file);
            setIsUploaded(true);
        }
    };
    return (
        <>

            <Dialog open={open}>
                <DialogTitle>QRE</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        For existing results of lattice surgery, press CALCULATE, or upload a new JSON file and press CALCULATE after.
                    </DialogContentText>
                    <JSONFileUpload uploaded={isUploaded} upFile={file} onFileUploaded={onFileUploaded} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { updateFileDialog(false) }}>Close</Button>
                    {/*<Button onClick={() => { updateFileDialog({ status: false, }) }}>Continue</Button>*/}
                    <Button onClick={() => {
                        if (!file) {
                            updateFileDialog({ status: false })
                        } else {
                            updateFileDialog({ status: true, file: file })
                        }
                    }}>Calculate</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default StaqTool;