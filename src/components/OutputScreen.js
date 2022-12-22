import React, { useState } from "react";
import { Box, Button, Chip, FormControl, FormControlLabel, Grid, Icon, IconButton, InputLabel, List, ListItem, MenuItem, Paper, RadioGroup, Select, Stack, Switch, Typography } from "@mui/material";
import { TOOLS_CONFIG } from '../constants/constants';
import CustomSwitch from './Switch';

function OutputScreen({ outputType, result, ...props }) {
    const [type, setType] = useState(outputType)
    const [output, setOutput] = useState(result)

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
            <Box mb={2} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Typography variant='h6'>Output</Typography>
                <Button variant="outlined" color="success" component="span" onClick={downloadResultAsQASM}>
                    Download QASM file
                </Button>
            </Box>
            <Typography variant='body2' style={{ whiteSpace: "pre" }}>{output}</Typography>
        </>
    );
}

export default OutputScreen;