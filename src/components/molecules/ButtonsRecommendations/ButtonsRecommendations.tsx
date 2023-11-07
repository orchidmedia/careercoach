import { Box, Button, Typography } from '@mui/material'
import { useRouter } from 'next/router';
import React from 'react'

const ButtonsRecommendations = ({ routerLink, textContinue }: any) => {
    const router = useRouter();


    const handleContinue = () => {
        //router.push('/candidate/recommendations/moreInsights')
        if (routerLink) {
            window.open(
                routerLink,
                '_blank' // <- This is what makes it open in a new window.
            );
        } else {
            router.push('/candidate/recommendations/jobs')
        }
    }
    const handleBack = () => {
        router.back()
    }
    return (
        <Box mt={5}>
            <Box display={'flex'} justifyContent={'flex-end'} gap={'20px'} mx={'90px'}>
                <Button onClick={() => handleBack()} variant="outlined" size="large">
                    <Typography sx={{ color: '#025E73' }}>
                        Back
                    </Typography>
                </Button>
                <Button onClick={() => handleContinue()} variant="contained" size="large">
                    <Typography sx={{ color: '#FFF' }}>
                        {textContinue}
                    </Typography>
                </Button>
            </Box>
        </Box>
    )
}
export default ButtonsRecommendations