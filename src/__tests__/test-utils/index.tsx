import React, { PropsWithChildren } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { render, RenderOptions } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';

import { store } from '@/shared/store';
import theme from '@/shared/theme';

function AllTheProviders({ children }: PropsWithChildren) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>{children}</NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
}

const customRender = (ui: JSX.Element, options?: RenderOptions) => {
  return render(ui, { wrapper: AllTheProviders, ...options });
};

// re-export everything
export * from '@testing-library/react-native';

// override render method
export { customRender as render };
