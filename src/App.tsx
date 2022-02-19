import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import Content from './Content/Content';
import theme from './theme';
import "typeface-roboto";
import { InjectedConnector } from '@web3-react/injected-connector';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

export const injected = new InjectedConnector({
  supportedChainIds: [1, 2, 3, 4, 5, 42],
});

function getLibrary(provider: any, connector: any) {
  return new Web3Provider(provider);
}

export default function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <Content />
        </Web3ReactProvider>
      </ThemeProvider>
    </div>
  );
}
