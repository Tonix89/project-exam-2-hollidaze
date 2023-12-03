import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  Button,
  Box,
  Typography,
  TextField,
  Backdrop,
  CircularProgress,
  Snackbar,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CloseIcon from "@mui/icons-material/Close";
import { dialogStyle } from "../../styles/dialog";
import theme from "../../styles/theme";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../tools/Validation/index";
import postApi from "../../api/Post";

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

  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("error");

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  function onSubmit(data) {
    const url = "https://api.noroff.dev/api/v1/holidaze/auth/login";

    loaderOpen();

    const bodyData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    postApi(url, bodyData).then((res) => {
      if (res.message) {
        setAlertSeverity("error");
        setAlert(true);
        setAlertText("Error: " + res.message);
      } else if (res.errors) {
        setAlertText("Error: " + res.errors[0].message);
        setAlertSeverity("error");
        setAlert(true);
      } else {
        setAlertText("Welcome " + res.name);
        setAlertSeverity("success");
        localStorage.setItem("holiToken", res.accessToken);
        localStorage.setItem("holiUser", res.name);
        setAlert(true);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }

      loaderClose();
    });
  }

  return (
    <>
      <Dialog
        sx={{ "& .MuiDialog-paperScrollBody": dialogStyle }}
        open={props.open}
        scroll='body'
        onClose={props.loginClose}
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'>
        <DialogContent>
          <Box sx={{ width: "100%" }}>
            <Snackbar
              open={alert}
              autoHideDuration={6000}
              onClose={() => setAlert(false)}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}>
              <Alert
                variant='filled'
                severity={alertSeverity}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  "& .MuiAlert-message": {
                    display: "flex",
                    alignItems: "center",
                  },
                }}>
                <Typography>{alertText}</Typography>
                <Button
                  color='inherit'
                  size='small'
                  onClick={() => setAlert(false)}>
                  <CloseIcon color='inherit' size='small' />
                </Button>
              </Alert>
            </Snackbar>
          </Box>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={openLoader}>
            <CircularProgress color='inherit' />
          </Backdrop>
          <Box sx={{ textAlign: "end" }}>
            <Button onClick={props.loginClose} sx={{ minWidth: 0, p: 0 }}>
              <CancelSharpIcon
                sx={{
                  color: theme.palette.secondary.main,
                  border: `2px solid ${theme.palette.secondary.main}`,
                  borderRadius: "20px",
                }}
              />
            </Button>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ mb: 2 }}>
              <Typography sx={{ fontWeight: "bold", mb: 0.5 }}>
                Email
              </Typography>
              <TextField
                {...register("email")}
                fullWidth
                variant='outlined'
                id='email'
                label='Required'
                size='small'
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "2px solid",
                  },
                }}
              />
              <Typography sx={{ color: "red" }}>
                {" "}
                {errors.email?.message}
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography sx={{ fontWeight: "bold", mb: 0.5 }}>
                Password
              </Typography>
              <TextField
                {...register("password")}
                fullWidth
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge='end'>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                variant='outlined'
                id='password'
                label='Required'
                size='small'
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "2px solid",
                  },
                }}
              />
              <Typography sx={{ color: "red" }}>
                {" "}
                {errors.password?.message}
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center", my: 2 }}>
              <Button
                type='submit'
                variant='contained'
                sx={{ width: 150, borderRadius: "20px", fontWeight: "bold" }}>
                Login
              </Button>
            </Box>
          </form>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <Typography variant='body1' sx={{ fontWeight: "bold", mb: 0.5 }}>
              No Account Yet?
            </Typography>
            <Button
              onClick={switchModal}
              sx={{ textDecoration: "underline", fontWeight: "bold" }}>
              <Typography variant='h6' sx={{ fontWeight: "bold", mb: 0.5 }}>
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
