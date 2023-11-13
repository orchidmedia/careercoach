import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useRouter } from 'next/router';

export const AlertError = ({ title, message, open, setOpen }: any) => {
  const { pathname } = useRouter();
  const router = useRouter();
  
  const handleClose = () => {
    if(pathname === '/candidate/uploadResumen'){
      router.reload()
      setOpen(false)
    } else {
      router.push('/candidate/uploadResumen')
      setOpen(false)
    }
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
       {/*  <DialogTitle id="alert-dialog-title">
          {title?.length > 0 ? title : "Internal Error"}
        </DialogTitle> */}
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message?.length > 0 ? message
              : "We didn't receive any response from OpenAI. This could be due to API intermittencies. We apologize for the inconvenience. Please restart the process and try again."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Try Again</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}