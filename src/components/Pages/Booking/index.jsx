import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Backdrop,
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
  Typography,
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from '@mui/material';
import GetVenue from '../../../api/Venue';
import theme from '../../../styles/theme';
import { NavLink } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers';
import { css } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import getTimeStamp from '../../../tools/Timestamp_array';

function Booking() {
  const customField = css({
    '.MuiOutlinedInput-notchedOutline': {
      borderRadius: 4,
      borderWidth: 2,
      borderColor: theme.palette.primary.main,
    },
    '.MuiFormLabel-root': {
      fontWeight: 'bold',
    },
  });

  let customCal;

  const [dateFrom, setDateFrom] = useState();
  const [dateFromError, setDateFromError] = useState(null);
  const [isDateFrom, setIsDateFrom] = useState(false);

  const [dateTo, setDateTo] = useState();
  const [dateToError, setDateToError] = useState(null);
  const [isDateTo, setIsDateTo] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentError, setPaymentError] = useState(false);

  const [daysArray, setDaysArray] = useState();
  const [calLoading, setCalLoading] = useState(false);

  const params = useParams();
  const url =
    'https://api.noroff.dev/api/v1/holidaze/venues/' +
    params.id +
    '?_owner=true&_bookings=true';

  const { data, isLoading, isError } = GetVenue(url);

  const bookingSchema = yup.object({
    guest: yup
      .number()
      .max(data.maxGuests, `Maximum guests is only ${data.maxGuests} persons.`)
      .typeError('Must be a number'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(bookingSchema) });

  function onSubmit(guests) {
    if (!dateFrom) {
      setIsDateFrom(true);
    } else if (dateFromError) {
      setIsDateFrom(false);
    }

    if (!dateTo) {
      setIsDateTo(true);
    } else if (dateFromError) {
      setIsDateTo(false);
    }

    if (!paymentMethod) {
      setPaymentError(true);
    } else {
      setPaymentError(false);
    }

    if (dateFrom && !dateFromError && dateTo && !dateToError && !paymentError) {
      const bodyData = {
        dateFrom: dateFrom['$d'].toISOString(),
        dateTo: dateTo['$d'].toISOString(),
        guests: guests.guest,
        venueId: data.id,
      };

      console.log(bodyData);
    }
  }

  const dateToErrorMessage = useMemo(() => {
    switch (dateToError) {
      case 'invalidDate': {
        return 'Your date is not valid.';
      }
      case 'disablePast': {
        return "You can't choose past date.";
      }
      default: {
        return '';
      }
    }
  }, [dateToError]);

  const dateFromErrorMessage = useMemo(() => {
    switch (dateFromError) {
      case 'invalidDate': {
        return 'Your date is not valid.';
      }
      case 'disablePast': {
        return "You can't choose past date.";
      }
      default: {
        return '';
      }
    }
  }, [dateFromError]);

  useEffect(() => {
    if (dateFrom) {
      setIsDateFrom(false);
    }

    if (dateTo) {
      setIsDateTo(false);
    }

    if (paymentMethod) {
      setPaymentError(false);
    }
  }, [dateFrom, dateTo, paymentMethod]);

  useEffect(() => {
    if (calLoading) {
      setTimeout(() => {
        setCalLoading(false);
        setTimeout(() => {
          const timeStampArray = getTimeStamp(data);
          const dayButton = document.querySelectorAll('.MuiPickersDay-root');
          dayButton.forEach((button) => {
            const timestamp = button.getAttribute('data-timestamp');
            if (timeStampArray.includes(parseInt(timestamp))) {
              button.classList.add('Mui-disabled');
              button.setAttribute('disabled', true);
            }
          });
          setDaysArray(timeStampArray);
        }, 1000);
      }, 500);
    }
  }, [calLoading, data]);

  if (daysArray) {
    const timestampStyles = daysArray.reduce((styles, timestamp) => {
      styles[`& [data-timestamp="${timestamp}"]`] = {
        color: theme.palette.grey.main,
      };
      return styles;
    }, {});

    const commonStyles = {
      border: `2px solid ${theme.palette.secondary.main}`,
      fontWeight: 'bold',
      width: 'auto',
      maxWidth: '320px',
      m: 0,
      '& .MuiPickersDay-today:not(.Mui-selected)': {
        borderColor: theme.palette.secondary.main,
      },
      '& div': { fontWeight: 'bold' },
      '& .MuiDayCalendar-header': {
        backgroundColor: theme.palette.light.main,
        width: 'auto',
      },
      '& .MuiTypography-root': { fontWeight: 'bolder' },
      '& button': { fontWeight: 'bolder' },
      '& .MuiYearCalendar-root': {
        width: 'auto',
      },
      '& .MuiDateCalendar-root': {
        width: 'auto',
      },
    };

    customCal = css({
      ...timestampStyles,
      ...commonStyles,
    });
  }

  if (isLoading) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  if (isError) {
    return <Box>Sorry, we have an error. {data.message}.</Box>;
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card
          sx={{
            border: '1px solid',
            borderColor: theme.palette.secondary.main,
          }}
        >
          <CardMedia
            component="img"
            image={data.media[0]}
            alt={data.name}
            sx={{
              p: 0.5,
              width: '-webkit-fill-available',
              borderRadius: '10px',
              maxHeight: { xs: '300px', md: '600px' },
            }}
          />
          <CardContent>
            <Box sx={{ width: 'fit-content' }}>
              <NavLink
                to={`/venue/${params.id}`}
                style={{ textDecoration: 'none' }}
              >
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{
                    fontWeight: 'bold',
                    color: theme.palette.primary.main,
                  }}
                >
                  {data.name}
                </Typography>
              </NavLink>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  alignItems: 'start',
                  justifyContent: 'center',
                  my: 3,
                }}
              >
                <Box sx={{ textAlign: 'start' }}>
                  <Typography
                    gutterBottom
                    variant="body2"
                    sx={{
                      fontWeight: 'bold',
                      color: theme.palette.primary.main,
                    }}
                  >
                    From
                  </Typography>
                  <DatePicker
                    id="datefrom"
                    label="MM/DD/YYYY"
                    disablePast
                    loading={calLoading}
                    renderLoading={() => <CircularProgress color="inherit" />}
                    defaultValue={dateFrom}
                    onChange={(value) => setDateFrom(value)}
                    onMonthChange={() => setCalLoading(true)}
                    onYearChange={() => setCalLoading(true)}
                    onOpen={() => setCalLoading(true)}
                    orientation="portrait"
                    onError={(newError) => setDateFromError(newError)}
                    slotProps={{
                      field: {
                        sx: { ...customField },
                      },
                      textField: {
                        helperText: dateFromErrorMessage,
                      },
                      layout: {
                        sx: {
                          ...customCal,
                        },
                      },
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'red',
                      display: isDateFrom ? 'block' : 'none',
                    }}
                  >
                    Choose a start date.
                  </Typography>
                </Box>
                <Typography
                  gutterBottom
                  variant="h5"
                  sx={{
                    fontWeight: 'bold',
                    color: theme.palette.primary.main,
                    mt: '25px',
                  }}
                >
                  -
                </Typography>
                <Box sx={{ textAlign: 'start' }}>
                  <Typography
                    gutterBottom
                    variant="body2"
                    sx={{
                      fontWeight: 'bold',
                      color: theme.palette.primary.main,
                    }}
                  >
                    To
                  </Typography>
                  <DatePicker
                    id="dateto"
                    label="MM/DD/YYYY"
                    disablePast
                    defaultValue={dateTo}
                    onChange={(value) => setDateTo(value)}
                    onMonthChange={() => setCalLoading(true)}
                    onYearChange={() => setCalLoading(true)}
                    onOpen={() => setCalLoading(true)}
                    orientation="portrait"
                    onError={(newError) => setDateToError(newError)}
                    slotProps={{
                      field: {
                        sx: { ...customField },
                      },
                      textField: {
                        helperText: dateToErrorMessage,
                      },
                      layout: {
                        sx: {
                          ...customCal,
                        },
                      },
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ color: 'red', display: isDateTo ? 'block' : 'none' }}
                  >
                    Choose an end date.
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    maxWidth: '560px',
                    width: '-webkit-fill-available',
                  }}
                >
                  <Typography
                    gutterBottom
                    variant="body2"
                    sx={{
                      fontWeight: 'bold',
                      color: theme.palette.primary.main,
                      textAlign: 'start',
                    }}
                  >
                    Number of Guest
                  </Typography>
                </Box>
                <TextField
                  {...register('guest')}
                  id="guest"
                  label="Required"
                  sx={{
                    maxWidth: '560px',
                    width: '-webkit-fill-available',
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: '2px solid',
                    },
                  }}
                />
                <Typography sx={{ color: 'red' }}>
                  {' '}
                  {errors.guest?.message}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
        <Box
          sx={{
            border: '1px solid',
            borderColor: theme.palette.secondary.main,
            borderRadius: 1,
            mt: 3,
            textAlign: 'center',
          }}
        >
          <Typography
            gutterBottom
            variant="h5"
            sx={{
              fontWeight: 'bold',
              color: theme.palette.primary.main,
              my: 2,
            }}
          >
            Payment Info
          </Typography>
          <Box sx={{ textAlign: 'start', p: 3 }}>
            <Typography
              gutterBottom
              variant="h6"
              sx={{
                fontWeight: 'bold',
                color: theme.palette.primary.main,
                my: 2,
              }}
            >
              Pay With :
            </Typography>
            <FormControl sx={{ px: 4 }}>
              <RadioGroup
                id="payment"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel
                  value="paypal"
                  control={<Radio />}
                  label="Paypal"
                  sx={{ '& .MuiTypography-root': { fontWeight: 'bold' } }}
                />
                <FormControlLabel
                  value="visa"
                  control={<Radio />}
                  label="Visa"
                  sx={{ '& .MuiTypography-root': { fontWeight: 'bold' } }}
                />
                <FormControlLabel
                  value="bank-transfer"
                  control={<Radio />}
                  label="Bank Transfer"
                  sx={{ '& .MuiTypography-root': { fontWeight: 'bold' } }}
                />
              </RadioGroup>
            </FormControl>
            <Typography
              sx={{ color: 'red', display: paymentError ? 'block' : 'none' }}
            >
              You must choose a payment method.
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center', my: 2 }}>
            <Button
              type="submit"
              variant="contained"
              sx={{ width: 150, borderRadius: '20px', fontWeight: 'bold' }}
            >
              Pay Now
            </Button>
          </Box>
        </Box>
      </form>
    </>
  );
}

export default Booking;
