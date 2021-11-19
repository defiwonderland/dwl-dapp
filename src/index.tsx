import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Providers from "./providers"
import MulticallUpdater from "./state/multicall/updater";

function Updaters() {
  return (
    <>
      <MulticallUpdater />
    </>
  );
}


ReactDOM.render(
  <React.StrictMode>
    <Providers>
      <Updaters />
      <App />
    </Providers>
  </React.StrictMode>,
  document.getElementById("root")
);
