import { Box, Typography } from '@mui/material'
import React from 'react'

const OptionDescription = ({ selected, type = '' }: any) => {
    if (type === 'job') {
        return (
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '758px',
                paddingX: '30px',
                paddingY: '20px',
                //justifyContent: 'space-evenly',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
            }}>
                <Typography sx={{
                    fontStyle: 'italic',
                    fontSize: '18px',
                    color: '#333',
                    marginBottom: '10px',
                    marginTop: '20px'
                }}>{selected?.title}</Typography>
                <Typography sx={{
                    marginBottom: '10px'
                }}>{selected?.company_name} | {selected?.location}</Typography>
                <Box sx={{ marginTop: '35px', textOverflow: 'ellipsis', overflow: 'hidden', height: '353px', marginBottom: '10px' }}>
                    <Typography sx={{
                        fontSize: '18px',
                        color: '#333'
                    }}>{selected?.description}</Typography>
                </Box>
                {/* {
                    selected?.description?.map((item: any, index: number) => {
                        return (
                            <Typography ml={2} key={index}>{item}</Typography>
                        )
                    })
                } */}
            </Box>
        )
    } else {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '758px',
                    padding: '10px',
                    //justifyContent: 'space-evenly'
                }}>
                {/* <Box sx={{
                    borderBottom: 1,
                    borderColor: '#16171C',
                    marginBottom: '15px'
                }}>
                    <Typography sx={{
                        fontStyle: 'italic',
                        fontSize: '35px'
                    }}>Tailor in Summary Section to Highlight Relevant Experience and Skills</Typography>
                </Box> */}
                {
                    selected?.description?.description?.map((item: any, index: number) => {
                        return (
                            <Typography ml={2} my={3} key={index}>{item}</Typography>
                        )
                    })
                }
                {/*  <Typography sx={{
                    fontStyle: 'italic',
                    fontSize: '18px',
                    color: '#333'
                }}>Example</Typography>
                <Typography sx={{
                    fontStyle: 'italic',
                    fontSize: '18px',
                    color: '#333'
                }}>How-To</Typography> */}
            </Box>
        )
    }
}
export default OptionDescription