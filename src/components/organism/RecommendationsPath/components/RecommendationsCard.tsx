import { Box, Button, Typography } from '@mui/material'
import { useRouter } from 'next/router';
import React from 'react'

const RecommendationsCard = ({ career }: any) => {
    const router = useRouter();

    const hadleGetIdealPaths = async () => {
        localStorage.setItem('promptCareers', career?.title)
        router.push({
            pathname: '/candidate/recommendations/idealPaths',
            query: { careers: career.title }
        }, '/candidate/recommendations/idealPaths')
    }

    return (
        <Box sx={{
            backgroundColor: '#025E73',
            color: '#FFF',
            width: '400px',
            borderRadius: '30px',
            padding: '20px',
            textAlign: 'center',
            margin: '10px',
        }}>
            <Typography>{career.title}</Typography>
            <Typography sx={{ fontStyle: 'italic', fontSize: '12px', marginTop: '10px', marginBottom: '15px' }} >{career.description}</Typography>
            <Button
                onClick={() => {
                    hadleGetIdealPaths()
                }}
                sx={{ marginBottom: '15px' }}
                variant="contained"
                size="medium">Search Jobs</Button>
        </Box>
    )
}
export default RecommendationsCard