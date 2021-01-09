import React, { createContext, useContext, useState } from 'react';

interface ITime {
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
}

interface IContextProps {
  time: ITime;
  setTime: React.Dispatch<React.SetStateAction<ITime>>;
}

const Context = createContext({} as IContextProps);

export const StateProvider: React.FC = ({ children }) => {
  const [time, setTime] = useState<ITime>({
    seconds: 0,
    minutes: 0,
    hours: 0,
    days: 0,
  });

  const value: IContextProps = { time, setTime };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useContextValue = () => useContext(Context);
