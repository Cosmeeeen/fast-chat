import moment from 'moment';
import React, { useEffect, useState } from 'react';

export default function DateAndTime() {
  const [currentDate, setCurrentDate] = useState(
    moment().format('MMMM Do YYYY')
  );
  const [currentTime, setCurrentTime] = useState(moment().format('h:mm:ss a'));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(moment().format('MMMM Do YYYY'));
      setCurrentTime(moment().format('h:mm:ss a'));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className='flex flex-col items-center justify-center'>
      <p className='text-center'>{currentDate}</p>
      <p className='text-center'>{currentTime}</p>
    </div>
  );
}
