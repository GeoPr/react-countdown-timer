import React, { FC } from 'react';
import { useContextValue } from '../../state/state';
import './Timer.scss';

export const Timer: FC = () => {
  const { time } = useContextValue();
  const entries = Object.entries(time);

  return (
    <div className="timer">
      {entries.map(([name, value], idx) => {
        return (
          <div className="timer__time" key={idx}>
            {value}
            <span>{name}</span>
          </div>
        );
      })}
    </div>
  );
};
