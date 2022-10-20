import React, { useState } from "react";
import { Box, Chip, FormControl, InputLabel, MenuItem, Select, Snackbar, Stack } from "@mui/material";
import { TOOLS_CONFIG } from '../constants/constants';

function ToolBox({ onChangingList, ...props }) {
    const tool_config = TOOLS_CONFIG;
    const [currentVal, setCurrentVal] = useState('')
    const [selectedTools, setSelectedTools] = useState([]);
    const handleChange = (e) => {
        setCurrentVal(e.target.value);
        setSelectedTools([...selectedTools, tool_config[e.target.value]]);
        onChangingList([...selectedTools, tool_config[e.target.value]]);
    }
    return (
        <Box>
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Tools</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Age"
                        onChange={handleChange}
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
            <Stack direction="row" spacing={1} style={{ flexWrap: 'wrap' }}>
                {
                    selectedTools.map((item, idx) => {
                        return (
                            <Chip key={idx} label={item.label} onDelete={() => { }} />
                            //<div>{item.label}</div>
                        );
                    })
                }
            </Stack>
        </Box>
    );
}

export default ToolBox;