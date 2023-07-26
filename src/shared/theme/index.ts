import { DefaultTheme } from 'react-native-paper';
import { MD3Type } from 'react-native-paper/lib/typescript/src/types';

type Mode = 'adaptive' | 'exact';

export default {
  ...DefaultTheme,
  mode: 'adaptive' as Mode,
  colors: {
    ...DefaultTheme.colors,
    primary: '#f48225',
    mediumDark: '#262626',
    dark: '#000000',
  },
  fonts: {
    displaySmall: {
      ...DefaultTheme.fonts.displaySmall,
      fontFamily: 'Inter-Regular',
    },
    displayMedium: {
      ...DefaultTheme.fonts.displayMedium,
      fontFamily: 'Inter-Regular',
    },
    displayLarge: {
      ...DefaultTheme.fonts.displayLarge,
      fontFamily: 'Inter-Regular',
    },
    headlineSmall: {
      ...DefaultTheme.fonts.headlineSmall,
      fontFamily: 'Inter-Regular',
    },
    headlineMedium: {
      ...DefaultTheme.fonts.headlineMedium,
      fontFamily: 'Inter-Regular',
    },
    headlineLarge: {
      ...DefaultTheme.fonts.headlineLarge,
      fontFamily: 'Inter-Regular',
    },
    titleSmall: {
      ...DefaultTheme.fonts.titleSmall,
      fontFamily: 'Inter-Medium',
      fontWeight: '400',
    } as MD3Type,
    titleMedium: {
      ...DefaultTheme.fonts.titleMedium,
      fontFamily: 'Inter-Medium',
      fontWeight: '400',
    } as MD3Type,
    titleLarge: {
      ...DefaultTheme.fonts.titleLarge,
      fontFamily: 'Inter-Regular',
    },
    labelSmall: {
      ...DefaultTheme.fonts.labelSmall,
      fontFamily: 'Inter-Medium',
      fontWeight: '400',
    } as MD3Type,
    labelMedium: {
      ...DefaultTheme.fonts.labelMedium,
      fontFamily: 'Inter-Medium',
      fontWeight: '400',
    } as MD3Type,
    labelLarge: {
      ...DefaultTheme.fonts.labelLarge,
      fontFamily: 'Inter-Medium',
      fontWeight: '400',
    } as MD3Type,
    bodySmall: {
      ...DefaultTheme.fonts.bodySmall,
      fontFamily: 'Inter-Regular',
    },
    bodyMedium: {
      ...DefaultTheme.fonts.bodyMedium,
      fontFamily: 'Inter-Regular',
    },
    bodyLarge: {
      ...DefaultTheme.fonts.bodyLarge,
      fontFamily: 'Inter-Regular',
    },
    default: {
      ...DefaultTheme.fonts.default,
      fontFamily: 'Inter-Regular',
    },
  },
  space: {
    sizeQuarck: '4px',
    sizeNano: '8px',
    sizeXxxs: '16px',
    sizeXxs: '24px',
    sizeXs: '32px',
    sizeSm: '40px',
    sizeMd: '48px',
    sizeLg: '56px',
    sizeXl: '64px',
    sizeXxl: '80px',
    sizeXxxl: '120px',
    sizeHuge: '160px',
    sizeGiant: '200px',
  },
  spaceNumber: {
    sizeQuarck: 4,
    sizeNano: 8,
    sizeXxxs: 16,
    sizeXxs: 24,
    sizeXs: 32,
    sizeSm: 40,
    sizeMd: 48,
    sizeLg: 56,
    sizeXl: 64,
    sizeXxl: 80,
    sizeXxxl: 120,
    sizeHuge: 160,
    sizeGiant: 200,
  },
};
