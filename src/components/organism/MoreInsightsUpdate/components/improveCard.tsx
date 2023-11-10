import { Box, Typography } from '@mui/material'
import React from 'react'

const ImproveCard = ({ improve }: any) => {
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
            <Typography
                sx={{ fontStyle: 'italic', fontWeight: 700, marginBottom: '20px' }}>
                {improve.title}
            </Typography>
            <Typography
                sx={{ fontSize: '15px', marginTop: '10px', marginBottom: '15px' }} >
                {improve.description}
            </Typography>
        </Box>
    )
}
export default ImproveCard