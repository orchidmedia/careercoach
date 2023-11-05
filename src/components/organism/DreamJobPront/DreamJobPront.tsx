import ButtonsCandidateFlow from '@/components/molecules/ButtonsCandidateFlow';
import { makeStyles } from '@material-ui/styles';
import { Box, TextField, Typography } from '@mui/material/'
import { useRouter } from 'next/router';
import React, { useState } from 'react'

const useStyles = makeStyles({
    underline: {
        "& .css-1a8gm5f-MuiInputBase-root-MuiInput-root:before": {
            borderBottom: "none"
        },

    }
});

const DreamJobPront = () => {
    const [value, setValue] = useState('')
    const classes = useStyles();
    return (
        <Box mt={5}>
            <Typography sx={{ marginLeft: { xs: '90px', lg: '100px', xl: '175px' } }}>In your words, what's your dream job description. Be as specific as possible</Typography>
            <Box display={'flex'} justifyContent={'center'} mb={10}>
                <TextField
                    id='filled-textarea'
                    placeholder='Enter your response here...'
                    multiline
                    variant='standard'
                    inputProps={{
                        style: {
                            height: '300px',
                            backgroundColor: '#FFF',
                            borderRadius: '30px',
                            padding: 15,

                        },
                    }}
                    sx={{
                        
                        width: { xs: '800px', lg: '1240px', xl: '1580px' },
                    }}
                    onChange={(e) => { setValue(e.target.value) }}
                />
            </Box>
            <ButtonsCandidateFlow inputValue={value} />
        </Box>
    )
}
export default DreamJobPront