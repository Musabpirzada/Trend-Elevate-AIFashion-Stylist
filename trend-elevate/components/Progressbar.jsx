import React, { useState, useEffect } from 'react';
import { Flex, CircularProgress, CircularProgressLabel } from '@chakra-ui/react';

export const Progressbar = ({ endDate, subscribed, onTimerEnd }) => {

 const extractDaysFromEndDate = (endDateString) => {
    if (!endDateString) return 0;

    const [startDateStr, endDateStr] = endDateString.split(' - ');

    // console.log("startDateStr:", startDateStr);
    // console.log("endDateStr:", endDateStr);

    // Extract the day part and month part from the start and end dates
    const startDateParts = startDateStr.split(' ');
    const endDateParts = endDateStr.split(' ');

    const startDay = parseInt(startDateParts[1]);
    const endDay = parseInt(endDateParts[1]);
    const startMonth = startDateParts[0];
    const endMonth = endDateParts[0];

    // console.log("startDay:", startDay);
    // console.log("endDay:", endDay);

    // If start and end months are the same, calculate days within that month
    if (startMonth === endMonth) {
        const days = endDay - startDay + 1;
        return days;
    }else{
          // Calculate the number of days between start and end dates for different months
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const daysInStartMonth = daysInMonth[new Date(startDateStr).getMonth()];
    console.log(daysInStartMonth)
    const daysInBetweenMonths = daysInStartMonth - startDay + endDay + 1

    return daysInBetweenMonths;
    }
};

  const days = extractDaysFromEndDate(endDate);

  const [progress, setProgress] = useState(100);

  useEffect(() => {
    let intervalId;

    if (days > 0) {
      intervalId = setInterval(() => {
        if (progress > 0) {
          setProgress(progress - (100 / days));
        } else {
          clearInterval(intervalId);
          onTimerEnd();
        }
      }, 1000 * 60 * 60 * 24);
    }

    return () => clearInterval(intervalId);
  }, [progress, days, onTimerEnd]);

  return (
    <Flex>
      <CircularProgress size="140px" value={progress} color="purple.500" thickness="11px">
        <CircularProgressLabel fontFamily="revert" fontSize="16px" fontWeight="bold" letterSpacing="tight">
          {subscribed ? `${days} DAYS` : '0D'}
        </CircularProgressLabel>
      </CircularProgress>
    </Flex>
  );
};
