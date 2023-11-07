import { Box, CircularProgress, Modal } from '@mui/material'
import React from 'react'

export const Loader = ({ open }: any) => {
    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{
                position: 'absolute' as 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 'auto',
                //bgcolor: 'background.paper',
                //boxShadow: 24,
                p: 4,
                textAlign:'center'
            }}>
                <CircularProgress />
            </Box>
        </Modal>
    )
}
