import { DefaultTheme } from 'react-native-paper';
import { MD3Type } from 'react-native-paper/lib/typescript/src/types';

type Mode = 'adaptive' | 'exact';

const family = {
  regular: 'Inter-Regular',
  medium: 'Inter-Medium',
  bold: 'Inter-Bold',
  semibold: 'Inter-SemiBold',
  accidental: 'NanumGothic-Bold',
};

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
      fontFamily: family.regular,
    },
    displayMedium: {
      ...DefaultTheme.fonts.displayMedium,
      fontFamily: family.regular,
    },
    displayLarge: {
      ...DefaultTheme.fonts.displayLarge,
      fontFamily: family.regular,
    },
    headlineSmall: {
      ...DefaultTheme.fonts.headlineSmall,
      fontFamily: family.regular,
    },
    headlineMedium: {
      ...DefaultTheme.fonts.headlineMedium,
      fontFamily: family.regular,
    },
    headlineLarge: {
      ...DefaultTheme.fonts.headlineLarge,
      fontFamily: family.regular,
    },
    titleSmall: {
      ...DefaultTheme.fonts.titleSmall,
      fontFamily: family.medium,
      fontWeight: '400',
    } as MD3Type,
    titleMedium: {
      ...DefaultTheme.fonts.titleMedium,
      fontFamily: family.medium,
      fontWeight: '400',
    } as MD3Type,
    titleLarge: {
      ...DefaultTheme.fonts.titleLarge,
      fontFamily: family.regular,
    },
    labelSmall: {
      ...DefaultTheme.fonts.labelSmall,
      fontFamily: family.medium,
      fontWeight: '400',
    } as MD3Type,
    labelMedium: {
      ...DefaultTheme.fonts.labelMedium,
      fontFamily: family.medium,
      fontWeight: '400',
    } as MD3Type,
    labelLarge: {
      ...DefaultTheme.fonts.labelLarge,
      fontFamily: family.medium,
      fontWeight: '400',
    } as MD3Type,
    bodySmall: {
      ...DefaultTheme.fonts.bodySmall,
      fontFamily: family.regular,
    },
    bodyMedium: {
      ...DefaultTheme.fonts.bodyMedium,
      fontFamily: family.regular,
    },
    bodyLarge: {
      ...DefaultTheme.fonts.bodyLarge,
      fontFamily: family.regular,
    },
    default: {
      ...DefaultTheme.fonts.default,
      fontFamily: family.regular,
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
  family,
};
