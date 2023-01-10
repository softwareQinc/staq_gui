import React, { useState } from "react";
import { Box, Button, Chip, FormControl, FormControlLabel, Grid, Icon, IconButton, InputLabel, List, ListItem, MenuItem, Paper, RadioGroup, Select, Stack, Switch, Typography } from "@mui/material";
import { JSONTree } from 'react-json-tree';
import { TOOLS_CONFIG } from '../constants/constants';
import CustomSwitch from './Switch';

function JSONOutputScreen({ result, ...props }) {
    const [output, setOutput] = useState(result)

    // Download result as QASM
    const downloadResultAsJSON = () => {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(result, null, 4)));
        element.setAttribute('download', "json-result.json");
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    return (
        <>
            {
                result &&
                <>

                    <Box mt={2} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <Button variant="outlined" color="success" component="span" onClick={downloadResultAsJSON}>
                            Download JSON file
                        </Button>
                    </Box>
                    <Box style={{ height: '50vh', overflow: 'hidden', overflowY: 'auto' }}>
                        <JSONTree data={result} rootName='lattice_surgery'
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
                </>

            }
        </>
    );
}

export default JSONOutputScreen;