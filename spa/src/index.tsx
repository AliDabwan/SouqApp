import React from 'react';
import ReactDOM from 'react-dom';
import './app/layout/styles.css';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import { createBrowserHistory } from 'history';
import { HistoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { SouqStore } from './app/store/configureStore';

// import { configureStore } from './app/store/configureStore';

// const SouqStore=configureStore();

export const history = createBrowserHistory();


ReactDOM.render(
  <React.StrictMode>
    <HistoryRouter history={history}>
      {/* <SouqProvider> */}
        <Provider store={SouqStore}>
        <App />

        </Provider>
      {/* </SouqProvider> */}
    </HistoryRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
