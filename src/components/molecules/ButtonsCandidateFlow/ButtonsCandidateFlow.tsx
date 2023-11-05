import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';


const ButtonsCandidateFlow = ({ documentPDF, inputValue }: any) => {
    const { pathname, isReady } = useRouter();
    const router = useRouter();
    const [previous, setPrevious] = useState('');

    const handleContinue = async () => {
        let formData = new FormData();

        if (documentPDF !== null || documentPDF !== null) {
            const PDF = documentPDF
            formData.append("file", PDF);
        }
        const valueToJSON = { 'recommend': inputValue }
        const value = JSON.stringify(valueToJSON)

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
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

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
                        localStorage.setItem('careers', JSON.stringify(result, null, 2))
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

    /* useEffect(() => {
        setPrevious(pathname)
    }, []) */

    return (
        <Box >
            <Box display={'flex'} justifyContent={'flex-end'} gap={'20px'} mx={'90px'}>
                <Button size="large">
                    <Link
                        style={{ textDecoration: 'none', color: '#979797' }}
                        href={{
                            pathname: pathname === '/candidate/uploadResumen' ? '/' : `/${previous}`,
                        }}>
                        Return
                    </Link>
                </Button>
                <Button onClick={() => handleContinue()} variant="contained" size="large">
                    <Typography sx={{ color: '#FFF' }}>
                        Continue
                    </Typography>
                </Button>
            </Box>
        </Box>
    )
}
export default ButtonsCandidateFlow