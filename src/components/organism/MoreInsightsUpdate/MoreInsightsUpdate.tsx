import ButtonsRecommendations from '@/components/molecules/ButtonsRecommendations';
import ListOptions from '@/components/molecules/ListOptions';
import OptionDescription from '@/components/molecules/OptionDescription';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import DropBox from '../UploadResumen/components/DropBox';

const MoreInsightsUpdate = () => {
    const router = useRouter();

    const [promptCareers, setPromptCareers]: any = useState();
    const [careers, setCareers]: any = useState();
    const [selected, setSelected]: any = useState();
    const [documentPDF, setDocumentPDF]: any = useState();
   
    const handleSaveCareers = () => {
        const localData = localStorage.getItem('promptCareers')
        setPromptCareers(localData)
    }


    const hadleGetIdealPaths = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "recommend": promptCareers
        });
        await fetch("https://careercoach-b957c7cfa4b2.herokuapp.com/career", {
            redirect: 'follow',
            method: 'POST',
            headers: myHeaders,
            body: raw,
        })
            .then(response => response.text())
            .then(result => {
                const data = JSON.parse(result)
                setCareers(data)
                setSelected(data?.body[0])
            }).catch(error => console.log('error', error));
    }

    useEffect(() => {
        handleSaveCareers()
    }, []);

    /* useEffect(() => {
        if (promptCareers?.length > 0) {
            hadleGetIdealPaths()
        }
    }, [promptCareers]); */

    return (
        <Box m={5}>
            <Box sx={{
                backgroundColor: '#FFF',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                borderRadius: '31px',
                paddingBottom: '25px'
            }}>
                <ListOptions
                    title={'Recommendations'}
                    options={careers}
                    selected={selected}
                    setSelected={setSelected}
                />
                <OptionDescription selected={selected} />
            </Box>
            <Typography sx={{
                fontWeight: 700,
                color: '#025E73',
                fontSize: '15px',
                marginTop: '25px',
                marginLeft: '20px',
                width:'400px'
            }}>Would you like to upload a newer version of your resume
                based on the recommendations given?</Typography>
            <Box>
                <DropBox setDocumentPDF={setDocumentPDF} />
            </Box>
            <ButtonsRecommendations textContinue={'GET JOBS'} />
        </Box>
    )
}
export default MoreInsightsUpdate