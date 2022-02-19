import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import Content from './Content/Content';
import theme from './theme';
import "typeface-roboto";

export default function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Content />
      </ThemeProvider>
    </div>
  );
}
