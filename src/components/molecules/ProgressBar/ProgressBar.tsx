import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/router';
import React from 'react'

const ProgressBar = ({counter = 0}:any) => {
    const { pathname } = useRouter();

    //const [counter, setCouner] = useState(0)

    const constHandleTextRecommendation = () => {
        let text

        switch (pathname) {
            case '/candidate/recommendations':
                text = "Here you'll find different career options based on the data we analyzed from your resume, job description and recommendations."
                break;

            case '/candidate/recommendations/idealPaths':
                text = "Here are some insights based the information given, and the career path selected."
                break;

            case '/candidate/recommendations/moreInsights':
                text = "We have analyzed your data. Here are some insights from Career Coach before you apply to jor dream job."
                break;

            default:
                break;
        }

        return (
            <Typography sx={{
                width: '300px',
                fontWeight: 300,
                color: '#013440',
                mt: 3,
                fontStyle: 'italic',
                fontSize: { xs: 10, sm: 12 },
                lineHeight: '140%',
                textAlign: 'center'
            }}>{text}</Typography>
        )
    }

    return (
        <Box>
            <Box display={'flex'} sx={{ justifyContent: 'space-around', }}>
                <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                    <Box sx={{ borderRadius: 20, backgroundColor: counter >= 0 ? '#025E73' : '#979797', height: '48px', width: '48px', marginBottom: 1 }} />
                    <Typography>Upload Resume</Typography>
                    {
                        pathname === '/candidate/uploadResumen' && <Typography sx={{
                            width: '300px',
                            fontWeight: 300,
                            color: '#013440',
                            mt: 3,
                            fontStyle: 'italic',
                            fontSize: { xs: 10, sm: 12 },
                            lineHeight: '140%',
                            textAlign: 'center'
                        }}>Our app will scan your resume and extract the most relevant information about your skills, education, and experience.</Typography>
                    }
                </Box>
                
                <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                    <Box sx={{ borderRadius: 20, backgroundColor: counter >= 1 ? '#025E73' : '#979797', height: '48px', width: '48px', marginBottom: 1 }} />
                    <Typography>Resume Recommendations</Typography>
                    {
                        pathname === '/candidate/improveResume' && <Typography sx={{
                            width: '300px',
                            fontWeight: 300,
                            color: '#013440',
                            mt: 3,
                            fontStyle: 'italic',
                            fontSize: { xs: 10, sm: 12 },
                            lineHeight: '140%',
                            textAlign: 'center'
                        }}>We have analyzed your resume. Here are some recommendations from Career Coach to improve it based on the current input.</Typography>
                    }
                </Box>

                <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                    <Box sx={{ borderRadius: 20, backgroundColor: counter >= 2 ? '#025E73' : '#979797', height: '48px', width: '48px', marginBottom: 1 }} />
                    <Typography>Dream Job Description</Typography>
                    {
                        pathname === '/candidate/dreamJob' && <Typography sx={{
                            width: '300px',
                            fontWeight: 300,
                            color: '#013440',
                            mt: 3,
                            fontStyle: 'italic',
                            fontSize: { xs: 10, sm: 12 },
                            lineHeight: '140%',
                            textAlign: 'center'
                        }}>Career Coach will use this prompt and merge it with your resume information to generate the ideal career path insights for the job search.</Typography>
                    }
                </Box>

                <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                    <Box sx={{ borderRadius: 20, backgroundColor: counter >= 3 ? '#025E73' : '#979797', height: '48px', width: '48px', marginBottom: 1 }} />
                    <Typography>Career Path Insights</Typography>
                    {
                        constHandleTextRecommendation()
                    }
                </Box>

                <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                    <Box sx={{ borderRadius: 20, backgroundColor: counter >= 4 ? '#025E73' : '#979797', height: '48px', width: '48px', marginBottom: 1 }} />
                    <Typography>Job Opportunites</Typography>
                    {
                        pathname === '/candidate/recommendations/jobs' && <Typography sx={{
                            width: '300px',
                            fontWeight: 300,
                            color: '#013440',
                            mt: 3,
                            fontStyle: 'italic',
                            fontSize: { xs: 10, sm: 12 },
                            lineHeight: '140%',
                            textAlign: 'center'
                        }}>Here are the 4 matches based on the career path you selected. You'll be prompted to Google Jobs in case you want to apply.</Typography>
                    }
                </Box>
            </Box>

        </Box>
    )
}
export default ProgressBar