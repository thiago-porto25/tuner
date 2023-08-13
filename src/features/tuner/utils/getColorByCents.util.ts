import { DefaultTheme } from 'styled-components';

export default function getColorByCents(theme: DefaultTheme, cents: number) {
  switch (true) {
    case cents >= -5 && cents <= 5:
      return theme.colors.primary;

    case cents > 5 && cents <= 15:
    case cents < -5 && cents >= -15:
      return theme.colors.secondary;

    case cents > 15 && cents <= 30:
    case cents < -15 && cents >= -30:
      return theme.colors.tertiary;

    case cents > 30:
    case cents < -30:
      return theme.colors.error;

    default:
      return theme.colors.primary;
  }
}
// TODO: correct the values later
