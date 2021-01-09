import React from 'react';
import { Form } from './Form/Form';
import { Timer } from './Timer/Timer';
import './App.scss';

const App: React.FC = () => {
  return (
    <div className="wrapper">
      <main className="page">
        <section
          className="page__sc sc"
          style={{
            background: 'url(images/bg.jpg) center center / cover no-repeat',
          }}>
          <div className="sc__container _container">
            <div className="sc__body">
              <Form />
              <Timer />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
