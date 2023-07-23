import React, { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';

import Routes from '@/shared/routes';
import { store } from '@/shared/store';
import theme from '@/shared/theme';

function App(): JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
        </ThemeProvider>
      </PaperProvider>
    </Provider>
  );
}

export default App;
