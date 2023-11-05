import ButtonsCandidateFlow from '@/components/molecules/ButtonsCandidateFlow';
import { Box, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/router';
import React, { useState } from 'react'

const DreamJobPront = () => {
    const [value, setValue] = useState('')

    return (
        <Box mt={5}>
            <Typography>In your words, what's your dream job description. Be as specific as possible</Typography>
            <Box display={'flex'} justifyContent={'center'}>
                <TextField
                    id='filled-textarea'
                    placeholder='Enter your response here...'
                    multiline
                    variant='standard'
                    inputProps={{
                        style: {
                            height: '300px',
                            width: '1000px',
                            backgroundColor: '#FFF',
                            borderRadius: '30px',
                            padding: 15,

                        },
                    }}
                    onChange={(e) => { setValue(e.target.value) }}
                />
            </Box>
            <ButtonsCandidateFlow inputValue={value} />
        </Box>
    )
}
export default DreamJobPront