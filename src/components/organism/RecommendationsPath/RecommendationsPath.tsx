import ButtonsCandidateFlow from '@/components/molecules/ButtonsCandidateFlow'
import React, { useEffect, useState } from 'react'
import RecommendationsCard from './components/RecommendationsCard'
import { Box } from '@mui/material'
import AlertError from '@/components/molecules/AlertError'



const RecommendationsPath = ({ careers }: any) => {

    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);


    const handleSetDate = () => {
        if(careers){
            setOpen(false)
            setData(JSON.parse(careers))
        } else {
            setOpen(true)
        }
    }

    useEffect(() => {
        handleSetDate();
    }, [careers])

    return (
        <Box mt={2} mb={4}>
            <Box
                display={'flex'}
                flexWrap={'wrap'}
                sx={{
                    justifyContent: 'center'
                }}>
                {
                    careers?.length > 0 && data?.map((career: any, index: number) => {
                        return (
                            <RecommendationsCard key={index} career={career} />
                        )
                    })
                }
            </Box>
            <ButtonsCandidateFlow />
            <AlertError open={open} setOpen={setOpen} />
        </Box>
    )
}
export default RecommendationsPath