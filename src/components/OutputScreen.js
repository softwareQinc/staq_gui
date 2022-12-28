import React, { useState } from "react";
import { Box, Button, Chip, FormControl, FormControlLabel, Grid, Icon, IconButton, InputLabel, List, ListItem, MenuItem, Paper, RadioGroup, Select, Stack, Switch, Typography } from "@mui/material";
import { JSONTree } from 'react-json-tree';
import { TOOLS_CONFIG } from '../constants/constants';
import CustomSwitch from './Switch';

function OutputScreen({ outputType, result, ...props }) {
    const [type, setType] = useState(outputType.mode)
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
                {
                    type == 'qasm' ?
                        <Button variant="outlined" color="success" component="span" onClick={downloadResultAsQASM}>
                            Download QASM file
                        </Button> : null
                }
            </Box>
            {
                type == 'qasm' &&
                <Typography variant='body2' style={{ whiteSpace: "pre" }}>{output}</Typography>
            }
            {
                type == 'lattice_surgery' &&
                <Box style={{ height: '60vh', overflow: 'hidden', overflowY: 'auto' }}>
                    <JSONTree data={output} rootName='lattice_surgery'
                        theme={{
                            //extend: theme,
                            tree: ({ style }) => ({
                                style: { ...style, backgroundColor: undefined },
                            }),
                            value: {
                                color: 'black',
                            },
                        }}
                        labelRenderer={([key]) => <strong>{key} :</strong>}
                        valueRenderer={(raw) => <em>{raw}</em>}
                    />
                </Box>
            }
        </>
    );
}

export default OutputScreen;