import ButtonsCandidateFlow from '@/components/molecules/ButtonsCandidateFlow';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ImproveCard from './components/improveCard';
import AlertError from '@/components/molecules/AlertError';

const MoreInsightsUpdate = () => {

    const [improves, setImproves]: any = useState();
    const [open, setOpen] = useState(false);


    const handleSaveImproves = () => {
        const localData = localStorage.getItem('improves')
        setImproves(JSON.parse(localData as string))
    }

    useEffect(() => {
        handleSaveImproves()
    }, []);

    useEffect(() => {
        if (!improves || improves.length === 0) {
            setOpen(true)
        } else {
            setOpen(false)
        }
    }, [improves]);

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
                            <ImproveCard key={index} improve={improve} />
                        )
                    })
                }
            </Box>
            <ButtonsCandidateFlow textContinue={'GET JOBS'} />
            <AlertError open={open} setOpen={setOpen} />

        </Box>
    )
}
export default MoreInsightsUpdate