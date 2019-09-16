import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import MasterLayout from '@shared/layout';
import theme from '@shared/assets/overrides/material-ui/theme';
import '@shared/assets/css/default.scss';
import BarsContainer from '../modules/bars';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <MasterLayout>
        <BarsContainer />
      </MasterLayout>
    </ThemeProvider>
  );
};

export default App;
