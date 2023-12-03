import React, { useState } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  Button,
  MobileStepper,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";
import theme from "../../../styles/theme";

function ImageModal(props) {
  const images = props.data.media;
  const desc = props.data.name;

  const themeUse = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <Dialog
        fullWidth
        maxWidth='lg'
        sx={{
          "& .MuiDialog-paperScrollBody": {
            border: "2px solid",
            borderColor: theme.palette.secondary.main,
            borderRadius: "10px",
            boxShadow: 24,
          },
        }}
        open={props.open}
        scroll='body'
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'>
        <DialogContent>
          <Box sx={{ display: "flex", justifyContent: "end", mb: 3 }}>
            <Button onClick={props.handleClose} sx={{ minWidth: 0, p: 0 }}>
              <CancelSharpIcon
                sx={{
                  color: theme.palette.secondary.main,
                  border: `2px solid ${theme.palette.secondary.main}`,
                  borderRadius: "20px",
                }}
              />
            </Button>
          </Box>
          <Box
            component='img'
            sx={{ width: "-webkit-fill-available" }}
            src={images[activeStep]}
            alt={desc}
          />
          <MobileStepper
            variant='text'
            steps={maxSteps}
            position='static'
            activeStep={activeStep}
            nextButton={
              <Button
                size='small'
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}>
                Next
                {themeUse.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button
                size='small'
                onClick={handleBack}
                disabled={activeStep === 0}>
                {themeUse.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ImageModal;
