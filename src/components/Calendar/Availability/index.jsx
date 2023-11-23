import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { css } from '@mui/system';
import theme from '../../../styles/theme';
import React, { useEffect, useState, useRef } from 'react';
import getTimeStamp from '../../../tools/Timestamp_array';

function Availability(props) {
  const [timeStampArray, setTimeStampArray] = useState();
  const monthRef = useRef(null);

  useEffect(() => {
    const mutationObserver = new MutationObserver(async () => {
      const timeStampArray = getTimeStamp(props.data);
      setTimeStampArray(timeStampArray);
    });

    if (monthRef.current) {
      mutationObserver.observe(monthRef.current, {
        childList: true,
        subtree: true,
      });

      return () => {
        mutationObserver.disconnect();
      };
    }
  }, [props.data]);

  let customCal;

  if (timeStampArray) {
    const timestampStyles = timeStampArray.reduce((styles, timestamp) => {
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
      '& .MuiDayCalendar-header': { backgroundColor: theme.palette.light.main },
      '& .MuiTypography-root': { fontWeight: 'bolder' },
      '& button': { fontWeight: 'bolder' },
      '& .MuiYearCalendar-root': {
        width: 'auto',
      },
    };

    customCal = css({
      ...timestampStyles,
      ...commonStyles,
    });
  }

  return (
    <>
      <div ref={monthRef}>
        <DateCalendar sx={customCal} disablePast readOnly />
      </div>
    </>
  );
}

export default Availability;
