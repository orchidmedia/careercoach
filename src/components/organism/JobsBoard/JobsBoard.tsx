import ListOptions from '@/components/molecules/ListOptions';
import OptionDescription from '@/components/molecules/OptionDescription';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import ButtonsRecommendations from '@/components/molecules/ButtonsRecommendations';
import Loader from '@/components/atoms/Loader';

export const JobsBoard = () => {
    const router = useRouter();

    const [promptCareers, setPromptCareers]: any = useState();
    const [careers, setCareers]: any = useState();
    const [selected, setSelected]: any = useState();
    const [loading, setloading] = useState(false);


    const handleSaveCareers = () => {
        const localData = localStorage.getItem('promptCareers')
        setPromptCareers(localData)
    }


    const hadleGetIdealPaths = async () => {
        setloading(true);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "recommend": promptCareers
        });
        await fetch("https://careercoach-b957c7cfa4b2.herokuapp.com/search-career", {
            redirect: 'follow',
            method: 'POST',
            headers: myHeaders,
            body: raw,
        })
            .then(response => response.text())
            .then(result => {
                setloading(false);
                const data = JSON.parse(result)
                setCareers(data)
                setSelected(data?.jobs_results[0])
            }).catch(error => {setloading(false); console.log('error', error)});
    }

    useEffect(() => {
        handleSaveCareers()
    }, []);

    useEffect(() => {
        if (promptCareers?.length > 0) {
            hadleGetIdealPaths()
        }
    }, [promptCareers]);

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
                    type={'job'}
                    title={'Job Opportunites'}
                    options={careers}
                    selected={selected}
                    setSelected={setSelected}
                />
                <OptionDescription type={'job'} selected={selected} />
            </Box>
            <ButtonsRecommendations routerLink={careers?.search_metadata?.google_jobs_url} textContinue={'APPLY JOB'} />
            <Loader open={loading} />
        </Box>
    )
}
export default JobsBoard