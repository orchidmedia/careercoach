import { Box, Button, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import InfoProfileImage from './components/InfoProfileImage';
import InfoProfileText from './components/InfoProfileText';

const InfoProfile = () => {
    const query = useMediaQuery("(max-width:200)");

    return (
        <Box display={'flex'} marginBottom={{ xs:15, lg:20}} marginTop={30} sx={{ justifyContent:'space-evenly', flexDirection:{xs: 'column', lg: 'row'} }} >
            <InfoProfileImage query={query} />
            <InfoProfileText query={query}/>
        </Box>
    )
}
export default InfoProfile;
