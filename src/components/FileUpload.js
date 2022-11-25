import { Box, Button, Icon, IconButton, Paper, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useState } from 'react';
import { styled } from '@mui/material/styles';

function FileUpload({ uploaded, upFile, onFileUploaded, ...props }) {
    const [isUploaded, setIsUploaded] = useState(uploaded ? uploaded : false);
    const [file, setFile] = useState(upFile);
    const handleFileUpload = (e) => {
        if (!e.target.files) {
            return;
        }

        onFileUploaded(e.target.files[0])
        setFile(e.target.files[0])
        setIsUploaded(true);

        //  const file = e.target.files[0];
        //  const { name } = file;
        //  setFilename(name);

        //  const reader = new FileReader();
        //  reader.onload = (evt) => {
        //    if (!evt?.target?.result) {
        //      return;
        //    }
        //    const { result } = evt.target;
        //    const records = parse(result as string, {
        //      columns: ["id", "value"],
        //      delimiter: ";",
        //      trim: true,
        //      skip_empty_lines: true
        //    });
        //    setCsvData(records);
        //  };
        //  reader.readAsBinaryString(file);
    }

    const link = document.getElementById('link');
    let objectURL;
    const downloadFile = (e) => {
        //e.preventDefault();
        if (objectURL) {
            // revoke the old object url to avoid using more memory than needed
            URL.revokeObjectURL(objectURL);
        }

        objectURL = URL.createObjectURL(file);

        link.download = file.name; // this name is used when the user downloads the file
        link.href = objectURL;
        link.click();
    }
    return (
        <Box>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h6">Upload your file</Typography>
                <Typography variant="body2">Upload .qasm file to get results</Typography>
            </Box>
            {!isUploaded &&
                <Box>
                    <input
                        accept=".qasm"
                        style={{ display: 'none' }}
                        id="raised-button-file"
                        multiple
                        type="file"
                        onChange={handleFileUpload}
                    />
                    <label htmlFor="raised-button-file">
                        <Button variant="outlined" component="span">
                            Upload File
                        </Button>
                    </label>
                </Box>
            }
            {
                isUploaded &&
                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">File Name</StyledTableCell>
                                <StyledTableCell align="center">Download</StyledTableCell>
                                <StyledTableCell align="center">Delete</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <StyledTableRow>
                                <StyledTableCell align="center">{file['name']}</StyledTableCell>
                                <StyledTableCell align="center"><IconButton aria-label="delete" onClick={downloadFile}>
                                    <a id="link" download style={{ display: 'none' }}>link to your file (upload a file first)</a>
                                    <Icon style={{ cursor: 'pointer' }}>file_download</Icon>
                                </IconButton></StyledTableCell>
                                <StyledTableCell align="center">
                                    <IconButton aria-label="delete" onClick={() => {
                                        setFile(null)
                                        setIsUploaded(false)
                                        onFileUploaded(null)
                                    }}><Icon style={{ cursor: 'pointer' }}>delete</Icon>
                                    </IconButton>
                                </StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </Box >
    );
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        fontSize: 12,
        padding: 2
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 12,
        padding: 10
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default FileUpload;