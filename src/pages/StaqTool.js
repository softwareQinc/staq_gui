//import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
//import TextField from '@mui/material/TextField';
//import FormControlLabel from '@mui/material/FormControlLabel';
//import Checkbox from '@mui/material/Checkbox';
//import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FileUpload from '../components/FileUpload';
import React, { useState } from 'react';
import httpService from '../services/http.service';
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup, Snackbar, TextField, Typography } from '@mui/material';
import { Formik, FieldArray, useFormikContext } from 'formik';
import * as yup from "yup";
import { Label } from '@mui/icons-material';
import { TOOLS_CONSTANT } from '../constants/constants';
import SnackbarComponent from '../components/Snackbar';
import MuiAlert from '@mui/material/Alert';
import AlertComponent from '../components/Snackbar';

function StaqTool() {
    const initialValues = {
        tools: [],
    };

    const validationSchema = yup.object().shape({
        tools: yup.array().min(1).of(yup.string().required()).required(),
    });

    const tools = TOOLS_CONSTANT;
    const [isUploaded, setIsUploaded] = useState(false);
    const [data, setData] = useState({});
    const [result, setResult] = useState(null);
    const [showSnackbar, setShowSnackbar] = useState(false)
    const [snackbarData, setSnackbarData] = useState({})
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

    const displaySnackbar = (msg, severity) => {
        setSnackbarData({ msg: msg, severity: severity })
        setShowSnackbar(true)
        setTimeout(() => {
            setShowSnackbar(false);
            setSnackbarData(null);
        }, 2000);
    }
    return (
        <>
            <Grid>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    validateOnChange={false}
                    validateOnBlur={false}
                    onSubmit={(values) => {
                        console.log("form values if validation succeed: ", values);
                        uploadData()
                    }}
                >{({ handleSubmit, ...props }) => {
                    return (
                        <>
                            <Grid item xs={4} style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10 }}>
                                <FieldArray
                                    name="tools"
                                    render={(arrayHelpers) => (
                                        <>
                                            {tools.map((asset, idx) => (
                                                <FormControlLabel key={idx} control={<Checkbox
                                                    size='sm'
                                                    name={`tools.${idx}`}
                                                    value={asset.key}
                                                    checked={props.values.tools.includes(asset.key)}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            arrayHelpers.push(asset.key);
                                                        } else {
                                                            const index = props.values.tools.indexOf(asset.key);
                                                            arrayHelpers.remove(asset.key);
                                                        }
                                                    }}
                                                />} label={asset.label} />
                                            ))}
                                        </>
                                    )}
                                />
                            </Grid>
                            <Grid item xs={4}>
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
                            </Grid>
                            <Grid item xs={4}>
                                <Button onClick={handleSubmit}>SUbmit</Button>
                            </Grid>
                        </>
                    )
                }}</Formik>
            </Grid>
            {
                showSnackbar &&
                <AlertComponent open={showSnackbar} msg={snackbarData.msg} severity={snackbarData.severity} />
            }
            {/*<Snackbar
                open={showSnackbar}
                autoHideDuration={2000}
            >
                <Alert variant="filled" severity={snackbarData.severity ? snackbarData.severity : 'success'} sx={{ width: '100%' }}>
                    {snackbarData.msg}
                </Alert>
            </Snackbar>*/}
        </>
    );
}

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default StaqTool;