import ButtonsCandidateFlow from '@/components/molecules/ButtonsCandidateFlow'
import React, { useEffect, useState } from 'react'
import RecommendationsCard from './components/RecommendationsCard'
import { Box } from '@mui/material'



const RecommendationsPath = ({ careers }: any) => {

    const [data, setData] = useState([]);

    const handleSetDate = () => {
        if(careers){
            setData(JSON.parse(careers))
        }
    }

    useEffect(() => {
        handleSetDate();
    }, [careers])

    console.log("data", data)
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
        </Box>
    )
}
export default RecommendationsPath