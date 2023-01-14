import React, { useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Checkbox, Chip, FormControl, FormControlLabel, Grid, Icon, IconButton, InputLabel, List, ListItem, MenuItem, Paper, Radio, RadioGroup, Select, Stack, Switch, TextField, Typography } from "@mui/material";
import { JSONTree } from 'react-json-tree';
import { TOOLS_CONFIG } from '../constants/constants';
import CustomSwitch from './Switch';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function ConfigSelect({ setConfigType, result, ...props }) {
    const [config, setConfig] = useState({
        mode: 'lattice_surgery',
        qre: false,
        config: {
            scheme: 'fast',
            p_g: "0.001",
            cycle_time: "0.00001"
        }
    })

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
                <Typography variant='h6'>Lattice Surgery</Typography>
                <Typography variant='body2'>You can edit configuration to get results</Typography>
                <Box mt={1} style={{
                    backgroundColor: '#F2F2F2', borderRadius: 10,
                    paddingRight: 15, paddingLeft: 15, paddingTop: 5, paddingBottom: 5
                }}>
                    {/*<FormControlLabel control={
                                <Checkbox
                                    checked={config.qre}
                                    onChange={(e) => {
                                        setConfig({ ...config, qre: e.target.checked })
                                        setConfigType({ ...config, qre: e.target.checked })
                                    }}
                                    inputProps={{ 'aria-label': 'Quantum Resource Estimation' }}
                                />
                            } label="Quantum Resource Estimation" />*/}
                    <FormControl sx={{ marginBottom: 0 }} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            value={config.config.scheme}
                            onChange={(e) => {
                                let val = e.target.value
                                setConfig({
                                    ...config, config: { ...config.config, scheme: val }
                                })
                                setConfigType({
                                    ...config, config: { ...config.config, scheme: val }
                                })
                            }}
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel value="fast" control={<Radio />} label="Fast" />
                            <FormControlLabel value="compact" control={<Radio />} label="Compact" />
                        </RadioGroup>
                    </FormControl>
                    <FormControl sx={{ marginBottom: 0 }} >
                        <TextField required
                            type='number'
                            helperText='p_g, must be between 1e-2 and 1e-5'
                            id="outlined-required"
                            //label="p_g"
                            value={config.config.p_g || 0.001}
                            inputProps={{ min: 1e-5, max: 1e-2 }}
                            size="small"
                            onChange={(e) => {
                                let val = e.target.value
                                setConfig({
                                    ...config, config: { ...config.config, p_g: val }
                                })
                                setConfigType({
                                    ...config, config: { ...config.config, p_g: val }
                                })
                            }}
                        />
                    </FormControl>
                    <FormControl sx={{ marginLeft: 2 }} >
                        <TextField required
                            type='number'
                            helperText='Cycle time, must be between 1e-2 and 1e-8'
                            id="outlined-required"
                            //label="Cycle Time"
                            inputProps={{ min: 1e-8, max: 1e-2 }}
                            size="small"
                            value={config.config.cycle_time || 0.00001}
                            onChange={(e) => {
                                let val = e.target.value
                                setConfig({
                                    ...config, config: { ...config.config, cycle_time: val }
                                })
                                setConfigType({
                                    ...config, config: { ...config.config, cycle_time: val }
                                })
                            }} />
                    </FormControl>
                </Box>
            </Box>
        </>
    );
}

export default ConfigSelect;