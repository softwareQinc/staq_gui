import { Box, Button } from '@mui/material';

function FileUpload() {
    const handleFileUpload = (e) => {
        console.log("here")
        if (!e.target.files) {
            return;
        }


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
    return (
        <Box>
            <input
                accept=".qasm"
                style={{ display: 'none' }}
                id="raised-button-file"
                multiple
                type="file"
            />
            <label htmlFor="raised-button-file">
                <Button variant="raised" component="span" onClick={handleFileUpload}>
                    Upload
                </Button>
            </label>
        </Box>
    );
}

export default FileUpload;