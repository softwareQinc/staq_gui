import React, { useState } from "react";
import { Box, Button, Checkbox, Chip, FormControl, FormControlLabel, Grid, Icon, IconButton, InputLabel, List, ListItem, MenuItem, Paper, Radio, RadioGroup, Select, Stack, Switch, TextField, Typography } from "@mui/material";
import { JSONTree } from 'react-json-tree';
import { TOOLS_CONFIG } from '../constants/constants';
import CustomSwitch from './Switch';

function ConfigSelect({ outputConfig, setConfigType, ...props }) {
    const [config, setConfig] = useState(outputConfig)

    const changeResourceConfig = (resourceConfig) => {
        setConfig({
            ...config, config: resourceConfig
        })
        setConfigType({
            ...config, config: resourceConfig
        })
    }

    return (
        <>
            <Box>
                <Typography variant='h6'>Select Output Type</Typography>
                <Typography variant='body2'>Select the format in which you want your results</Typography>
                <Box mt={2}>
                    <RadioGroup
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        defaultValue='qasm'
                        value={config.mode}
                        onChange={(e) => {
                            console.log("here")
                            setConfig({ ...config, mode: e.target.value })
                            setConfigType({ ...config, mode: e.target.value })
                        }}
                        name="row-radio-buttons-group"
                    >
                        <FormControlLabel value="qasm" control={<Radio />} label="QASM (Open Quantum Assembly Language)" />
                        <FormControlLabel value="lattice_surgery" control={<Radio />} label="Lattice Surgery" />
                    </RadioGroup>
                </Box>
                {
                    config.mode == 'lattice_surgery' &&
                    <Box style={{ width: '60%', padding: 20, borderColor: '#5A5A5A', borderWidth: 1, borderStyle: 'solid', borderRadius: 10 }}>
                        <FormControlLabel control={
                            <Checkbox
                                checked={config.qre}
                                onChange={(e) => {
                                    console.log(e.target.checked)
                                    setConfig({ ...config, qre: e.target.checked })
                                    setConfigType({ ...config, qre: e.target.checked })
                                }}
                                inputProps={{ 'aria-label': 'Quantum Resource Estimation' }}
                            />
                        } label="Quantum Resource Estimation" />
                        {
                            config.qre &&
                            <Box style={{
                                display: 'flex', flexDirection: 'column',
                                backgroundColor: '#F2F2F2', borderRadius: 10,
                                padding: 15
                            }}>
                                <FormControl sx={{ marginBottom: 2 }} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        defaultValue='fast'
                                        value={config.config.scheme}
                                        onChange={(e) => {
                                            let val = e.target.value
                                            changeResourceConfig({
                                                ...config, config: {
                                                    scheme: val,
                                                    p_g: config.config.p_g,
                                                    cycle_time: config.config.cycle_time
                                                }
                                            })
                                        }}
                                        name="row-radio-buttons-group"
                                    >
                                        <FormControlLabel value="fast" control={<Radio />} label="Fast" />
                                        <FormControlLabel value="compact" control={<Radio />} label="Compact" />
                                    </RadioGroup>
                                </FormControl>
                                <FormControl sx={{ marginBottom: 2 }} >
                                    <TextField required
                                        type='number'
                                        helperText='Cycle time must be between 1e-2 and 1e-5'
                                        id="outlined-required"
                                        label="p_g"
                                        value={config.config.p_g}
                                        inputProps={{ min: 1e-5, max: 1e-2 }}
                                        onChange={(e) => {
                                            let val = e.target.value
                                            changeResourceConfig({
                                                scheme: config.config.scheme,
                                                p_g: val,
                                                cycle_time: config.config.cycle_time
                                            })
                                        }}
                                    //inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} 
                                    />
                                </FormControl>
                                <FormControl>
                                    <TextField required
                                        type='number'
                                        helperText='Cycle time must be between 1e-2 and 1e-8'
                                        id="outlined-required"
                                        label="Cycle Time"
                                        inputProps={{ min: 1e-8, max: 1e-2 }}
                                        value={config.config.cycle_time}
                                        onChange={(e) => {
                                            let val = e.target.value
                                            changeResourceConfig({
                                                ...config, config: {
                                                    scheme: config.config.scheme,
                                                    p_g: config.config.p_g,
                                                    cycle_time: val
                                                }
                                            })
                                        }} />
                                </FormControl>
                            </Box>
                        }
                    </Box>
                }


            </Box>
        </>
    );
}

export default ConfigSelect;