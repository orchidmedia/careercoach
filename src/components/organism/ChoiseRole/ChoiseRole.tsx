import React from 'react'
import RoleOptionCard from './components/RoleOptionCard'
import { Campaign } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'

const roles = [
    {
        icon: <Campaign sx={{ fontSize: 52 }} />,
        title: 'I am a Job Seeker',
        text: 'Use Artificial Intelligence to match your resume, preferences, and profile with the best jobs for you. Apply, track, get feedback and find your dream job with ease.',
        textButton: 'FIND JOBS',
        route: '/candidate'
    },
    {
        icon: <Campaign sx={{ fontSize: 52 }} />,
        title: 'I am an Employer',
        text: 'Use Artificial Intelligence to match your job openings with the most qualified and suitable candidates. Post jobs, manage applications, and hire the best talent for your company',
        textButton: 'FIND SEEKERS',
        route: '/employee'
    }
]

const ChoiseRole = () => {
    return (
        <Box textAlign={'center'} paddingBottom={10}>
            <Box marginBottom={5}>
                <Typography
                    sx={{
                        fontWeight: 300,
                        color: '#013440',
                        mb: 3,
                        fontStyle: 'italic',
                        fontSize: { xs: 15, sm: 20 },
                        lineHeight: '140%'
                    }}>Start Searching</Typography>
                <Typography
                    sx={{
                        fontWeight: 300,
                        color: '#333',
                        fontStyle: 'italic',
                        fontSize: { xs: "0.9rem", sm: 46 },
                        lineHeight: '120%'
                    }}>Choose your role and get started</Typography>
            </Box>
            <Box display={'flex'} gap={'70px'} paddingX={10} flexDirection={'row'} sx={{ justifyContent:'space-evenly', flexDirection:{xs: 'column', sm: 'row'} }}>
                {roles.map((role, index) => {
                    return (
                        <RoleOptionCard key={index} role={role} />
                    )
                })}
            </Box>

        </Box>
    )
}
export default ChoiseRole