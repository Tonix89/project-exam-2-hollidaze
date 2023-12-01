import {
  Box,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Dialog,
  DialogContent,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { dialogStyle } from "../../styles/dialog";
import React, { useState } from "react";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";
import theme from "../../styles/theme";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../../tools/Validation/index";
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

  const [isManager, setIsManager] = useState("");

  const handleChange = (event) => {
    setIsManager(event.target.value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signUpSchema) });

  function onSubmit(data) {
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
      if (res.errors) {
        alert(res.errors[0].message);
      } else {
        alert("Welcome " + res.name);
        switchModal();
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
        onClose={props.handleCloses}
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'>
        <DialogContent>
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
          <form onSubmit={handleSubmit(onSubmit)}>
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
                type='password'
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
                {...register("avatar")}
                fullWidth
                variant='outlined'
                id='avatar'
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
                {errors.avatar?.message}
              </Typography>
            </Box>
            <Box sx={{ minWidth: 120 }}>
              <Typography sx={{ fontWeight: "bold", mb: 0.5 }}>
                Do you want to manage venue?
              </Typography>
              <FormControl fullWidth size='small'>
                <InputLabel id='manager-select-label'>Required</InputLabel>
                <Select
                  {...register("venueManager")}
                  required
                  labelId='manager-select-label'
                  id='manager-select'
                  value={isManager}
                  label='Required'
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
          </form>
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
