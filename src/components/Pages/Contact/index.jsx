import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  TextField,
  Button,
  Backdrop,
  Snackbar,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import theme from "../../../styles/theme";
import { ContactSchema } from "../../../tools/Validation/Contact";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

function Contact() {
  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(ContactSchema) });

  function onSubmit(data) {
    console.log(data);
    setAlertText("Message Sent");
    setAlert(true);
  }

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        my: 2,
        p: 0,
      }}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={alert}>
        <Box sx={{ width: "100%" }}>
          <Snackbar
            open={alert}
            autoHideDuration={6000}
            onClose={() => window.location.reload()}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}>
            <Alert
              variant='filled'
              severity='success'
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
                onClick={() => window.location.reload()}>
                <CloseIcon color='inherit' size='small' />
              </Button>
            </Alert>
          </Snackbar>
        </Box>
      </Backdrop>
      <Typography variant='h5' sx={{ fontWeight: "bold", mb: 3 }}>
        Contact Form
      </Typography>
      <Box
        component='form'
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          border: "2px solid",
          borderColor: theme.palette.secondary.main,
          borderRadius: "10px",
          width: { xs: "100%", md: "60%" },
          p: 2,
        }}>
        <Box sx={{ mb: 2 }}>
          <Typography sx={{ fontWeight: "bold", mb: 0.5 }}>Email</Typography>
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
          <Typography sx={{ fontWeight: "bold", mb: 0.5 }}>Subject</Typography>
          <TextField
            {...register("subject")}
            fullWidth
            variant='outlined'
            id='subject'
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
            {errors.subject?.message}
          </Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography sx={{ fontWeight: "bold", mb: 0.5 }}>Message</Typography>
          <TextField
            {...register("message")}
            fullWidth
            multiline
            rows={5}
            variant='outlined'
            id='message'
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
            {errors.message?.message}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Button
            type='submit'
            variant='contained'
            sx={{
              width: 150,
              borderRadius: "20px",
              fontWeight: "bold",
              my: 2,
            }}>
            Send
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Contact;
