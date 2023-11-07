import { gradient } from '@/config/theme'
import { Box, Typography } from '@mui/material'
import React from 'react'

const ListOptions = ({ type = '', title, options, selected, setSelected }: any) => {
    
    return (
        <Box paddingLeft={2} width={'758px'}>
            {type === 'job' &&
                <Typography sx={{
                    color: '#025E73',
                    fontSize: '25px',
                    marginLeft: '20px',
                    marginTop: '25px',
                    marginBottom: '10px'
                }}>{title}</Typography>
            }
            {
                type === 'job' ? options?.jobs_results?.map((option: any, index: number) => {
                    return (
                        <Box onClick={() => setSelected(option)} key={index} sx={{
                            background: selected === option ? gradient.bg : '#FFF',
                            height: '70px',
                            borderTopLeftRadius: '30px',
                            borderBottomLeftRadius: '30px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: '35px'
                        }} >
                            <Typography sx={{
                                color: selected === option ? '#FFF' : '#333',
                                marginLeft: '25px',
                                fontSize: '20px',
                                fontWeight: 700,
                            }}>{option.title}</Typography>
                        </Box>
                    )
                }) : options?.map((option: any, index: number) => {
                    return (
                        <Box onClick={() => setSelected(option)} key={index} sx={{
                            background: selected === option ? gradient.bg : '#FFF',
                            height: '70px',
                            borderTopLeftRadius: '30px',
                            borderBottomLeftRadius: '30px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: '35px'
                        }} >
                            <Typography sx={{
                                color: selected === option ? '#FFF' : '#333',
                                marginLeft: '25px',
                                fontSize: '20px',
                                fontWeight: 700,
                            }}>{option.title}</Typography>
                        </Box>
                    )
                })
            }
        </Box >
    )
}
export default ListOptions