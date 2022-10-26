import React, { useState } from "react";
import { Box, Chip, FormControl, InputLabel, MenuItem, Select, Stack } from "@mui/material";
import { TOOLS_CONFIG } from '../constants/constants';

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
            <Box sx={{ minWidth: 110, }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Tools</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Age"
                        onChange={handleChange}
                        style={{ height: 50 }}
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
            <Stack direction="row" spacing={1} style={{ flexWrap: 'wrap', marginTop: 10 }}>
                {
                    selectedTools.map((item, idx) => {
                        return (
                            <Chip key={idx} label={item.label} onDelete={() => { }} style={{ margin: 5 }} />
                        );
                    })
                }
            </Stack>
        </Box>
    );
}

export default ToolBox;