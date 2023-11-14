import { Box, Typography } from '@mui/material';
import { useState } from 'react';

const initialState = {
    fileDocument: "",
};

const DropBox = ({ setDocumentPDF }: any) => {
    const [document, setDocument] = useState<any>(initialState);

    const handleOnChange = (value: any) => {
        setDocumentPDF(value);
        setDocument(value);
    };

    const handleDocumentFile = (e: any) => {
        handleOnChange(e.target.files[0]);
    };
    return (
        <Box marginY={'40px'} display={'flex'} flexDirection={'row'} justifyContent={'center'} gap={'30px'}>
            <Box sx={{
                height: '400px',
                width: { xs: '600px', lg: '900px' },
                borderRadius: '30px',
                border: '2px dashed var(--10, #025E73)',
                backgroundColor: 'rgba(255, 255, 255, 0.60)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <input
                    accept={".pdf"}
                    style={{
                        height: '400px',
                        width: '900px',
                        opacity: 0,
                    }}
                    id={"button-pdf"}
                    type={"file"}
                    onChange={(e) => handleDocumentFile(e)}
                />
                <Box sx={{
                    position: 'absolute',
                    textAlign: 'center'
                }}>
                    <Typography>Drag Here Your Resume</Typography>
                    <Typography>or</Typography>
                    <label style={{ cursor: "pointer" }} htmlFor={"button-pdf"}>
                        <Typography sx={{ textDecoration: 'underline' }}>
                            Choose File
                        </Typography>
                    </label>
                </Box>

            </Box>
            <Box sx={{
                width: '300px'
            }}>
                <Typography sx={{
                    fontStyle: 'italic',
                    color: '#333',
                    fontSize: '24px',
                    fontWeight: 300
                }}>Selected Files</Typography>
                <Typography sx={{
                    color: '#333',
                    fontSize: '15px',
                    fontWeight: 700,
                    marginTop: '25px'
                }}>File name:</Typography>
                <Box sx={{
                    my: '10px',
                    width: '270px',
                    height: '83px',
                    borderRadius: '30px',
                    backgroundColor: 'rgba(255, 255, 255, 0.60)',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Typography sx={{ fontSize: '12px' }}>{document?.name}</Typography>
                    {/* <Box>
                        <Typography sx={{ fontSize: '12px' }}>{document?.size}</Typography>
                    </Box> */}
                </Box>
            </Box>
        </Box>
    )
}
export default DropBox