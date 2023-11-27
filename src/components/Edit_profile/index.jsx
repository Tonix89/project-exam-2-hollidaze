import React, { useState } from "react";
import {
  Box,
  Typography,
  Dialog,
  DialogContent,
  Backdrop,
  CircularProgress,
  Button,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";
import { dialogStyle } from "../../styles/dialog";
import theme from "../../styles/theme";
import {
  validateImageUrlSchema,
  venueMangerSchema,
} from "../../tools/Validation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getToken } from "../../tools/Token";
import postApi from "../../api/Post";

function EditProfile(props) {
  const token = getToken();
  const [openLoader, setOpenLoader] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validateImageUrlSchema, venueMangerSchema),
  });

  const onSubmit = (data) => {
    if (
      data.image === props.data.avatar &&
      data.venueManager.toString() === props.data.venueManager.toString()
    ) {
      window.location.reload();
    } else {
      setOpenLoader(true);
      const avatarUrl = `https://api.noroff.dev/api/v1/holidaze/profiles/${props.data.name}/media`;
      const avatarData = {
        avatar: data.image,
      };

      const avatarOptions = {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(avatarData),
      };

      postApi(avatarUrl, avatarOptions).then((avatarRes) => {
        if (avatarRes.avatar) {
          const managerUrl = `https://api.noroff.dev/api/v1/holidaze/profiles/${props.data.name}`;
          const managerData = {
            venueManager: Boolean(data.venueManager),
          };

          const managerOptions = {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(managerData),
          };

          postApi(managerUrl, managerOptions).then((res) => {
            if (res.avatar) {
              window.location.reload();
            } else {
              alert("Sorry we have error updating your profile. " + res);
              setOpenLoader(false);
            }
          });
        } else {
          alert("Sorry we have error updating your profile. " + avatarRes);
          setOpenLoader(false);
        }
      });
    }
  };
  return (
    <Dialog
      sx={{ "& .MuiDialog-paperScrollBody": dialogStyle }}
      open={props.open}
      scroll='body'
      onClose={props.close}
      aria-labelledby='scroll-dialog-title'
      aria-describedby='scroll-dialog-description'>
      <DialogContent>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openLoader}>
          <CircularProgress color='inherit' />
        </Backdrop>
        <Box sx={{ textAlign: "end" }}>
          <Button onClick={props.close} sx={{ minWidth: 0, p: 0 }}>
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
            <Typography sx={{ fontWeight: "bold", mb: 0.5 }}>Avatar</Typography>
            <TextField
              {...register("image")}
              fullWidth
              variant='outlined'
              id='avatar'
              label='Required'
              defaultValue={props.data.avatar}
              size='small'
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "2px solid",
                },
              }}
            />
            <Typography sx={{ color: "red" }}>
              {""}
              {errors.image?.message}
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
                labelId='manager-select-label'
                id='manager-select'
                defaultValue={props.data.venueManager}
                label='Required'
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "2px solid",
                  },
                }}>
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>
            <Typography sx={{ color: "red" }}>
              {""}
              {errors.venueManager?.message}
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center", my: 2 }}>
            <Button
              type='submit'
              variant='contained'
              sx={{ width: 150, borderRadius: "20px", fontWeight: "bold" }}>
              Save Profile
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default EditProfile;
