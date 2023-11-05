import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/router';
import React from 'react'

const ProgressBar = () => {
    const { pathname } = useRouter();
    return (
        <Box>
            <Box display={'flex'} sx={{ justifyContent: 'space-around', }}>
                <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                    <Box sx={{ borderRadius: 20, backgroundColor: '#979797', height: '48px', width: '48px', marginBottom: 1 }} />
                    <Typography>Upload Resumen</Typography>
                    {
                        pathname === '/candidate/uploadResumen' && <Typography sx={{
                            width: '300px',
                            fontWeight: 300,
                            color: '#013440',
                            mt: 3,
                            fontStyle: 'italic',
                            fontSize: { xs: 10, sm: 12 },
                            lineHeight: '140%',
                            textAlign: 'center'
                        }}>Our app will scan your resume and extract the most relevant information about your skills, education, and experience.</Typography>
                    }
                </Box>

                <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                    <Box sx={{ borderRadius: 20, backgroundColor: '#979797', height: '48px', width: '48px', marginBottom: 1 }} />
                    <Typography>Dream Job Description</Typography>
                    {
                        pathname === '/candidate/dreamJob' && <Typography sx={{
                            width: '300px',
                            fontWeight: 300,
                            color: '#013440',
                            mt: 3,
                            fontStyle: 'italic',
                            fontSize: { xs: 10, sm: 12 },
                            lineHeight: '140%',
                            textAlign: 'center'
                        }}>Our app will ise this information to train the prompt in order to look for the best jobs possible based on your input.</Typography>
                    }
                </Box>

                <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                    <Box sx={{ borderRadius: 20, backgroundColor: '#979797', height: '48px', width: '48px', marginBottom: 1 }} />
                    <Typography>Recommendations</Typography>
                    {
                        pathname === '/candidate/recommendations' && <Typography sx={{
                            width: '300px',
                            fontWeight: 300,
                            color: '#013440',
                            mt: 3,
                            fontStyle: 'italic',
                            fontSize: { xs: 10, sm: 12 },
                            lineHeight: '140%',
                            textAlign: 'center'
                        }}>Here you'll find different career options based on the data we analyzed from your resume, job description and recommendations.</Typography>
                    }
                </Box>

                <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                    <Box sx={{ borderRadius: 20, backgroundColor: '#979797', height: '48px', width: '48px', marginBottom: 1 }} />
                    <Typography>Career Path</Typography>
                </Box>
            </Box>

        </Box>
    )
}
export default ProgressBar