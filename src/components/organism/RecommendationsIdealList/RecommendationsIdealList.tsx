import ButtonsRecommendations from '@/components/molecules/ButtonsRecommendations'
import OptionDescription from '@/components/molecules/OptionDescription'
import { Box } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ListOptions from '../../molecules/ListOptions/ListOptions'
import Loader from '@/components/atoms/Loader'

const RecommendationsIdealList = (data: any) => {
    const { isReady } = useRouter();
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
        setloading(true)
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
                setloading(false)
                const data = JSON.parse(result)
                setCareers(data)
                setSelected(data[0])
            }).catch(error => console.log('error', error));
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
                    title={'Career Path Insights'}
                    options={careers}
                    selected={selected}
                    setSelected={setSelected}
                />
                <OptionDescription selected={selected} />
            </Box>
            <ButtonsRecommendations textContinue={'GET MORE INSIGHTS'} />
            <Loader open={loading} />
        </Box>
    )
}
export default RecommendationsIdealList