import Loader from '@/components/atoms/Loader';
import { Box, Button, Tooltip, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import AlertError from '../AlertError';


const ButtonsCandidateFlow = ({ documentPDF, inputValue, }: any) => {
    const { pathname, isReady } = useRouter();
    const router = useRouter();
    const [loading, setloading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleContinue = async () => {
        setloading(true)
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
                        redirect: 'follow',
                        method: 'POST',
                        body: formData
                    }).then((response) => {
                        if (response) {
                            return response.json();
                        } else {
                            setOpen(true);
                            throw new Error('Server response wasn\'t OK');
                        }
                    }).then((res) => {
                        setloading(false);
                        localStorage.setItem('improves', JSON.stringify(res, null, 2))
                        console.log("Success:", res);
                        router.push('/candidate/improveResume')
                    }).catch((error) => {
                        setOpen(true);
                        console.error("Error 2:", error)
                    });
                break;
            case '/candidate/improveResume':
                router.push('/candidate/dreamJob')
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
                        setloading(false);
                        localStorage.setItem('recommendations', JSON.stringify(result, null, 2))
                        console.log('result', result);
                        if (isReady) {
                            router.push({
                                pathname: '/candidate/recommendations',
                                query: { careers: JSON.stringify(result) }
                            }, '/candidate/recommendations')
                        }
                    }).catch(error => {
                        setOpen(true);
                        console.error("Error:", error)
                    });

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

    const handleButtonDisabled = () => {
        if (documentPDF && pathname === '/candidate/uploadResumen') {
            return false
        }
        if (pathname === '/candidate/improveResume') {
            return false
        }
        if (inputValue?.length >= 50 && pathname === '/candidate/dreamJob') {
            return false
        }
        return true
    }

    const handleReturnTooltip = () => {
        if (pathname == '/candidate/recommendations') {
            return
        }
        if (pathname == '/candidate/dreamJob' && handleButtonDisabled()) {
            return (
                <Tooltip title="Please give Career Coach more input">
                    <span>
                        <Button disabled={handleButtonDisabled()} onClick={() => handleContinue()} variant="contained" size="large">
                            <Typography sx={{ color: '#FFF' }}>
                                Continue
                            </Typography>
                        </Button>
                    </span>
                </Tooltip>
            )
        } else {
            return (
                <Button disabled={handleButtonDisabled()} onClick={() => handleContinue()} variant="contained" size="large">
                    <Typography sx={{ color: '#FFF' }}>
                        Continue
                    </Typography>
                </Button>
            )
        }
    }

    return (
        <Box >
            <Box display={'flex'} justifyContent={'flex-end'} gap={'20px'} mx={'90px'}>
                <Button onClick={() => handleBack()} variant="outlined" size="large">
                    <Typography sx={{ color: '#025E73' }}>
                        Back
                    </Typography>
                </Button>
                {handleReturnTooltip()}
            </Box>
            <Loader open={loading} />
            <AlertError open={open} setOpen={setOpen} />
        </Box>
    )
}
export default ButtonsCandidateFlow