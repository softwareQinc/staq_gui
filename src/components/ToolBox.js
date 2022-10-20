import React, { useState } from "react";
import { Box, Chip, FormControl, InputLabel, MenuItem, Select, Snackbar, Stack } from "@mui/material";
import { TOOLS_CONFIG } from '../constants/constants';

function ToolBox(props) {
    const tool_config = TOOLS_CONFIG;
    const [selectedTools, setSelectedTools] = useState([]);
    const handleChange = (e) => {
        setSelectedTools([...selectedTools, tool_config[e.target.value]]);
    }
    return (
        <Box>
            <FormControl>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Age"
                    onChange={handleChange}
                >
                    {
                        Object.keys(tool_config).map((item) => {
                            return (
                                <MenuItem value={item}>{tool_config[item].label}</MenuItem>
                            );
                        })
                    }
                </Select>
            </FormControl>
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