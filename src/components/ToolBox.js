import React, { useState } from "react";
import { Box, Chip, FormControl, FormControlLabel, Grid, Icon, IconButton, InputLabel, List, ListItem, MenuItem, Paper, Select, Stack, Switch, Typography } from "@mui/material";
import { TOOLS_CONFIG } from '../constants/constants';
import CustomSwitch from './Switch';

function ToolBox({ tools, onChangingList, ...props }) {
    const tool_config = TOOLS_CONFIG;
    const [currentVal, setCurrentVal] = useState('')
    const [selectedTools, setSelectedTools] = useState(tools);
    const [showAddOption, setShowAddOption] = useState(false);

    const handleChange = (e) => {
        setCurrentVal(e.target.value);
        setSelectedTools([...selectedTools, tool_config[e.target.value]]);
        onChangingList([...selectedTools, tool_config[e.target.value]]);
    }

    const handleDeleteTool = (idx) => {
        //debugger;
        let tools = selectedTools
        setSelectedTools([...tools.slice(0, idx), ...tools.slice(idx+1)])
        onChangingList([...tools.slice(0, idx), ...tools.slice(idx+1)])
    }
    const handleParamChange = (paramState, paramIdx, index) => {
        console.log(paramState, paramIdx, index)
        let tools = selectedTools;
        tools[index]['params'][paramIdx] = paramState;
        setSelectedTools(tools);
        onChangingList(tools);
    }

    return (
        <Box>
            <Box sx={{ mt: 1, mb: 1 }}>
                <Typography variant="h6">Staq Tool</Typography>
            </Box>
            {
                showAddOption &&
                <AddToolPaper currentVal={currentVal} addValue={handleChange} closeAddSection={() => { setShowAddOption(false) }} />
            }
            <ListItem disablePadding direction="row" spacing={1} style={{ flexWrap: 'wrap', marginTop: 10, paddingHorizontal: 0, maxHeight: '60vh', overflowY: 'auto' }}>
                {
                    selectedTools.map((item, idx) => {
                        return (
                            <React.Fragment key={idx}>
                                <Tool item={item} deleteTool={(e) => { handleDeleteTool(idx) }} paramChanged={(e, paramIdx) => { handleParamChange(e, paramIdx, idx) }} />
                            </React.Fragment>
                        );
                    })
                }
                {
                    !showAddOption &&
                    <AddCard key={'addCard'} onAdd={() => { setShowAddOption(true) }} />
                }
            </ListItem>
        </Box>
    );
}

const Tool = ({ key, item, deleteTool, paramChanged, ...props }) => {
    return (
        <Paper elevation={3} className="card-container">
            <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="overline">{item.label}</Typography>
                <IconButton aria-label="delete" onClick={deleteTool}><Icon size={8} style={{ cursor: 'pointer' }}>remove_circle_outline</Icon>
                </IconButton>
            </Box>
            {
                item.params.length > 0 &&
                <Box>
                    {
                        item.params.map((param, paramIdx) => {
                            return (
                                <ParamContainer key={paramIdx} param={param} onChange={(paramState) => {
                                    console.log(paramState)
                                    paramChanged(paramState, paramIdx)
                                }} />
                            )
                        })
                    }
                </Box>
            }
        </Paper>
    );
}

const AddCard = ({ onAdd, ...props }) => {
    return (
        <Paper elevation={3} className="card-container" style={{
            display: 'flex',
            flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10, cursor: 'pointer'
        }} onClick={onAdd}>
            <IconButton aria-label="add" ><Icon size={8} style={{ cursor: 'pointer' }}>add_circle</Icon>
                &nbsp;</IconButton>
            <Typography>Add New</Typography>
        </Paper>
    )
}

const AddToolPaper = ({ currentVal, addValue, closeAddSection, ...props }) => {
    const tool_config = TOOLS_CONFIG;
    return (
        <Grid container sx={{ mb: 1 }}>
            <Grid item sm={6}>
                <Paper elevation={3} style={{
                    height: 100, border: 'lightgray',
                    borderWidth: 1, borderStyle: 'solid', paddingTop: '10px', paddingLeft: '10px'
                }}>
                    <FormControl sx={{ m: 1 }} size='small' style={{ width: '80%' }}>
                        <InputLabel id="demo-simple-select-label">Tools</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Tool"
                            onChange={addValue}
                            //style={{ height: 50 }}
                            placeholder="Select"
                            value={currentVal}
                        >
                            {
                                Object.keys(tool_config).map((item, idx) => {
                                    return (
                                        <MenuItem key={idx} value={item}>{tool_config[item].label}</MenuItem>
                                    );
                                })
                            }
                        </Select>
                    </FormControl>
                    <IconButton aria-label="delete" onClick={closeAddSection}><Icon size={8} style={{ cursor: 'pointer' }}>close</Icon>
                    </IconButton>
                </Paper>
            </Grid>
        </Grid>
    )
}

const ParamContainer = ({ param, onChange, ...props }) => {
    const [paramState, setParamState] = useState(param)
    return (
        <>
            <Switch checked={paramState.value} size='small' inputProps={{ 'aria-label': paramState.label }}
                onChange={(event) => {
                    //debugger;
                    setParamState({ ...paramState, value: event.target.checked })
                    onChange({ ...paramState, value: event.target.checked })
                }} />
            <Typography variant="caption">{param.label}</Typography>
        </>

        //<FormControlLabel checked={paramState.value} control={<CustomSwitch inputProps={{ 'aria-label': paramState.label }}
        //    onChange={(event) => {
        //        //debugger;
        //        setParamState({ ...paramState, value: event.target.checked })
        //        onChange({ ...paramState, value: event.target.checked })
        //    }} />} label={<Typography variant="overline">{param.label}</Typography>} />
    );
}

export default ToolBox;