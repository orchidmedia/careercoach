import { Box, Button, Typography } from '@mui/material'
import React from 'react'

const RecommendationsCard = ({ career }: any) => {
    return (
        <Box sx={{
            backgroundColor: '#025E73',
            color:'#FFF',
            width:'400px',
            borderRadius: '30px',
            padding: '20px',
            textAlign: 'center',
            margin: '10px',
        }}>
            <Typography>{career.title}</Typography>
            <Typography sx={{fontStyle:'italic', fontSize: '12px', marginTop: '10px', marginBottom:'15px'}} >{career.description}</Typography>
            <Button sx={{marginBottom:'15px'}} variant="contained" size="medium">Search Jobs</Button>
        </Box>
    )
}
export default RecommendationsCard