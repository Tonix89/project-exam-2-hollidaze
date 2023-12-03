import {
  Box,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  Button,
  Dialog,
  DialogContent,
  Backdrop,
  CircularProgress,
  Alert,
  Snackbar,
  InputAdornment,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { dialogStyle } from "../../styles/dialog";
import React, { useState } from "react";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";
import theme from "../../styles/theme";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  signUpSchema,
  validateImageUrlSchema,
} from "../../tools/Validation/index";
import postApi from "../../api/Post";

function SignUp(props) {
  const switchModal = () => {
    props.signUpClose();
    props.loginOpen();
  };

  const [openLoader, setOpenLoader] = useState(false);
  const loaderClose = () => {
    setOpenLoader(false);
  };
  const loaderOpen = () => {
    setOpenLoader(true);
  };

  const [isManager, setIsManager] = useState(false);

  const handleChange = (event) => {
    setIsManager(event.target.value);
  };

  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("error");

  const [imageError, setImageError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleAddImage = () => {
    const imageInput = document.getElementById("avatar").value;
    if (imageInput) {
      const data = {
        image: imageInput,
      };

      validateImageUrlSchema
        .validate(data)
        .then(() => {
          setImageError("");
        })
        .catch((error) => setImageError(error.errors[0]));
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signUpSchema) });

  function onSubmit(data) {
    if (data.image) {
      if (!imageError) {
        const url = "https://api.noroff.dev/api/v1/holidaze/auth/register";

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
            setAlertSeverity("error");
            setAlert(true);
            setAlertText("Error: " + res.errors[0].message);
          } else {
            setAlertSeverity("success");
            setAlert(true);
            setAlertText("Registration Successful. Please login.");
            setTimeout(() => {
              switchModal();
            }, 3000);
          }
          loaderClose();
        });
      }
    } else {
      setImageError("Must not be empty");
    }
  }

  return (
    <>
      <Dialog
        sx={{ "& .MuiDialog-paperScrollBody": dialogStyle }}
        open={props.open}
        scroll='body'
        onClose={props.handleCloses}
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
            <Button onClick={props.signUpClose} sx={{ minWidth: 0, p: 0 }}>
              <CancelSharpIcon
                sx={{
                  color: theme.palette.secondary.main,
                  border: `2px solid ${theme.palette.secondary.main}`,
                  borderRadius: "20px",
                }}
              />
            </Button>
          </Box>
          <Box component='form' onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ mb: 2 }}>
              <Typography sx={{ fontWeight: "bold", mb: 0.5 }}>Name</Typography>
              <TextField
                {...register("name")}
                fullWidth
                variant='outlined'
                id='name'
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
                {errors.name?.message}
              </Typography>
            </Box>
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
            <Box sx={{ mb: 2 }}>
              <Typography sx={{ fontWeight: "bold", mb: 0.5 }}>
                Avatar
              </Typography>
              <TextField
                {...register("image")}
                fullWidth
                variant='outlined'
                id='avatar'
                label='Required'
                onChange={handleAddImage}
                size='small'
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "2px solid",
                  },
                }}
              />
              <Typography sx={{ color: "red" }}>{imageError}</Typography>
            </Box>
            <Box sx={{ minWidth: 120 }}>
              <Typography sx={{ fontWeight: "bold", mb: 0.5 }}>
                Do you want to manage venue?
              </Typography>
              <FormControl fullWidth size='small'>
                <Select
                  {...register("venueManager")}
                  labelId='manager-select-label'
                  id='manager-select'
                  value={isManager}
                  onChange={handleChange}
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "2px solid",
                    },
                  }}>
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ textAlign: "center", my: 2 }}>
              <Button
                type='submit'
                variant='contained'
                sx={{ width: 150, borderRadius: "20px", fontWeight: "bold" }}>
                Sign Up
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <Typography variant='body1' sx={{ fontWeight: "bold", mb: 0.5 }}>
              Have Account Already?
            </Typography>
            <Button
              onClick={switchModal}
              sx={{ textDecoration: "underline", fontWeight: "bold" }}>
              <Typography variant='h6' sx={{ fontWeight: "bold", mb: 0.5 }}>
                Login
              </Typography>
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SignUp;
