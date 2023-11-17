import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  Button,
  Box,
  Typography,
  TextField,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
import { dialogStyle } from '../../styles/dialog';
import theme from '../../styles/theme';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../tools/Validation/index';
import postApi from '../../api/Post';

function Login(props) {
  const switchModal = () => {
    props.loginClose();
    props.signUpOpen();
  };

  const [openLoader, setOpenLoader] = useState(false);
  const loaderClose = () => {
    setOpenLoader(false);
  };
  const loaderOpen = () => {
    setOpenLoader(true);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  function onSubmit(data) {
    const url = 'https://api.noroff.dev/api/v1/holidaze/auth/login';

    loaderOpen();

    const bodyData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    postApi(url, bodyData).then((res) => {
      if (res.errors) {
        loaderClose();
        alert(res.errors[0].message);
      } else {
        alert('Welcome ' + res.name);
        window.location.reload();
        localStorage.setItem('holiToken', res.accessToken);
      }
    });
  }

  return (
    <>
      <Dialog
        sx={{ '& .MuiDialog-paperScrollBody': dialogStyle }}
        open={props.open}
        scroll="body"
        onClose={props.loginClose}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogContent>
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={openLoader}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <Box sx={{ textAlign: 'end' }}>
            <Button onClick={props.loginClose} sx={{ minWidth: 0, p: 0 }}>
              <CancelSharpIcon
                sx={{
                  color: theme.palette.secondary.main,
                  border: `2px solid ${theme.palette.secondary.main}`,
                  borderRadius: '20px',
                }}
              />
            </Button>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ mb: 2 }}>
              <Typography sx={{ fontWeight: 'bold', mb: 0.5 }}>
                Email
              </Typography>
              <TextField
                {...register('email')}
                fullWidth
                variant="outlined"
                id="email"
                label="Required"
                size="small"
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: '2px solid',
                  },
                }}
              />
              <Typography sx={{ color: 'red' }}>
                {' '}
                {errors.email?.message}
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography sx={{ fontWeight: 'bold', mb: 0.5 }}>
                Password
              </Typography>
              <TextField
                {...register('password')}
                fullWidth
                type="password"
                variant="outlined"
                id="password"
                label="Required"
                size="small"
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: '2px solid',
                  },
                }}
              />
              <Typography sx={{ color: 'red' }}>
                {' '}
                {errors.password?.message}
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center', my: 2 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{ width: 150, borderRadius: '20px', fontWeight: 'bold' }}
              >
                Login
              </Button>
            </Box>
          </form>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
              No Account Yet?
            </Typography>
            <Button
              onClick={switchModal}
              sx={{ textDecoration: 'underline', fontWeight: 'bold' }}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                Sign Up
              </Typography>
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Login;
