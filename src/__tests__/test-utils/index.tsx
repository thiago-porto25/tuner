import React, { PropsWithChildren } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { render, RenderOptions } from '@testing-library/react-native';
import { Provider } from 'react-redux';

import { store } from '@/shared/store';

function AllTheProviders({ children }: PropsWithChildren) {
  return (
    <Provider store={store}>
      <NavigationContainer>{children}</NavigationContainer>
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
