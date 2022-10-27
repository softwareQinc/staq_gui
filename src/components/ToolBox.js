import React, { useState } from "react";
import { Box, Chip, FormControl, FormControlLabel, Icon, IconButton, InputLabel, ListItem, MenuItem, Paper, Select, Stack, Typography } from "@mui/material";
import { TOOLS_CONFIG } from '../constants/constants';
import CustomSwitch from './Switch';

function ToolBox({ tools, onChangingList, ...props }) {
    const tool_config = TOOLS_CONFIG;
    const [currentVal, setCurrentVal] = useState('')
    const [selectedTools, setSelectedTools] = useState(tools);
    const handleChange = (e) => {
        setCurrentVal(e.target.value);
        setSelectedTools([...selectedTools, tool_config[e.target.value]]);
        onChangingList([...selectedTools, tool_config[e.target.value]]);
    }
    return (
        <Box>
            <Box>
                <FormControl sx={{ m: 1, minWidth: 150 }} size='small'>
                    <InputLabel id="demo-simple-select-label">Tools</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Age"
                        onChange={handleChange}
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
            </Box>
            <ListItem direction="row" spacing={1} style={{ flexWrap: 'wrap', marginTop: 10 }}>
                {
                    selectedTools.map((item, idx) => {
                        return (
                            <Box key={idx} style={{ backgroundColor: 'lightgray', margin: 5, padding: 5, borderRadius: 10, }}>
                                <Box>
                                    <Typography variant="overline">{item.label}</Typography>
                                    <IconButton aria-label="delete" onClick={() => {
                                    }}><Icon size={10} style={{ cursor: 'pointer' }}>cancel</Icon>
                                    </IconButton>
                                </Box>
                                <Box>
                                    {
                                        item.params.length > 0 &&
                                        <>
                                            {
                                                item.params.map((param, paramIdx) => {
                                                    return (
                                                        <ParamContainer param={param} onChange={(paramState) => {
                                                            let tools = selectedTools;
                                                            tools[idx]['params'][paramIdx] = paramState;

                                                            console.log(paramState)
                                                            setSelectedTools(tools);
                                                            onChangingList(tools);

                                                        }} />
                                                    )
                                                })
                                            }
                                        </>
                                    }
                                </Box>
                                {/*<Chip key={idx} label={item.label} onDelete={() => {
                                    let tools = selectedTools
                                    tools.splice(idx, 1)
                                    setSelectedTools(tools)
                                    onChangingList(tools)
                                }} style={{ margin: 5 }} />*/}
                            </Box>
                        );
                    })
                }
            </ListItem>
        </Box>
    );
}

const ParamContainer = ({ param, onChange, ...props }) => {
    const [paramState, setParamState] = useState(param)
    return (
        <FormControlLabel checked={paramState.value} control={<CustomSwitch inputProps={{ 'aria-label': paramState.label }}
            onChange={(event) => {
                //debugger;
                setParamState({ ...paramState, value: event.target.checked })
                onChange({ ...paramState, value: event.target.checked })
            }} />} label={param.label} />
    );
}

export default ToolBox;