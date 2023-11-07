import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';


const ButtonsCandidateFlow = ({ documentPDF, inputValue, }: any) => {
    const { pathname, isReady } = useRouter();
    const router = useRouter();
    //const [previous, setPrevious] = useState('');

    const handleContinue = async () => {
        let formData = new FormData();

        if (documentPDF !== null || documentPDF !== null) {
            const PDF = documentPDF
            formData.append("file", PDF);
        }

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        switch (pathname) {
            case '/candidate/uploadResumen':
                await fetch('https://careercoach-b957c7cfa4b2.herokuapp.com/upload/csv',
                    {
                        mode: 'no-cors',
                        method: 'POST',
                        body: formData
                    }).then((response) => response.json())
                    .catch((error) => console.error("Error:", error))
                    .then((response) => { console.log("Success:", response); router.push('/candidate/dreamJob') });
                break;
            case '/candidate/dreamJob':
                var raw = JSON.stringify({
                    "recommend": inputValue
                });

                await fetch("https://careercoach-b957c7cfa4b2.herokuapp.com/recommend", {
                    redirect: 'follow',
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                })
                    .then(response => response.text())
                    .then(result => {
                        localStorage.setItem('recommendations', JSON.stringify(result, null, 2))
                        console.log('result', result);
                        if (isReady) {
                            router.push({
                                pathname: '/candidate/recommendations',
                                query: { careers: JSON.stringify(result) }
                            }, '/candidate/recommendations')
                        }
                    }).catch(error => console.log('error', error));

                break;

            default:
                break;
        }
    }

    const handleBack = () => {
        if (pathname === '/candidate/uploadResumen') {
            router.push('/')
        }
        router.back()
    }

    return (
        <Box >
            <Box display={'flex'} justifyContent={'flex-end'} gap={'20px'} mx={'90px'}>
                <Button onClick={() => handleBack()} variant="outlined" size="large">
                    <Typography sx={{ color: '#025E73' }}>
                        Back
                    </Typography>
                </Button>
                {pathname !== '/candidate/recommendations' &&
                    <Button onClick={() => handleContinue()} variant="contained" size="large">
                        <Typography sx={{ color: '#FFF' }}>
                            Continue
                        </Typography>
                    </Button>
                }
            </Box>
        </Box>
    )
}
export default ButtonsCandidateFlow