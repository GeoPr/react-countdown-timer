import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useContextValue } from '../../state/state';
import './Form.scss';

export const Form: FC = () => {
  const [dateValue, setDateValue] = useState('December 31 2021 23:59:59');
  const [isValidDate, setIsValidDate] = useState(true);
  const { setTime } = useContextValue();
  const intervalId = useRef<NodeJS.Timeout | null>(null);

  const resetTime = useCallback(() => {
    setTime(prev => ({
      ...prev,
      seconds: 0,
      minutes: 0,
      hours: 0,
      days: 0,
    }));
  }, [isValidDate]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateValue(e.target.value);
    setIsValidDate(true);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    clearInterval(intervalId.current!);

    const endTime = new Date(dateValue).getTime();

    if (endTime) {
      updateTime(endTime);
      setDateValue('');
    } else {
      setIsValidDate(false);
    }
  };

  function updateTime(endTime: number) {
    intervalId.current = setInterval(() => {
      const diff = Math.floor(endTime - Date.now());

      const seconds = Math.floor(diff / 1000) % 60;
      const minutes = Math.floor(diff / 1000 / 60) % 60;
      const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
      const days = Math.floor(diff / 1000 / 60 / 60 / 24);

      setTime(prev => ({
        ...prev,
        seconds,
        minutes,
        hours,
        days,
      }));
    }, 1000);
  }

  useEffect(() => {
    return () => {
      clearInterval(intervalId.current!);
      resetTime();
    };
  }, [resetTime]);

  return (
    <form action="#" className="form" onSubmit={submitHandler}>
      <input
        className={`form__input ${!isValidDate ? '_invalid' : ''}`}
        placeholder="December 31 2021 23:59:59"
        value={dateValue}
        onChange={changeHandler}
        autoComplete="off"
      />
      <button className="form__button" type="submit">
        Start the timer !
      </button>
    </form>
  );
};
