import ButtonsCandidateFlow from '@/components/molecules/ButtonsCandidateFlow';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ImproveCard from './components/improveCard';

const MoreInsightsUpdate = () => {
    const router = useRouter();

    const [improves, setImproves]: any = useState();

    const handleSaveImproves = () => {
        const localData = localStorage.getItem('improves')
        setImproves(JSON.parse(localData as string))
    }

    useEffect(() => {
        handleSaveImproves()
    }, []);

    return (
        <Box m={5}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                borderRadius: '31px',
                paddingBottom: '25px',
                marginBottom: '15px'
            }}>
                {
                    improves?.map((improve: any, index: number) => {
                        return (
                           <ImproveCard key={index} improve={improve}/> 
                        )
                    })
                }
            </Box>
            <ButtonsCandidateFlow textContinue={'GET JOBS'} />
        </Box>
    )
}
export default MoreInsightsUpdate