/** @type {import('jest').Config} */
module.exports = {
  preset: 'react-native',
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    '<rootDir>/src/__tests__/test-utils/setupTests.ts',
  ],
  testRegex: '(\\.(test|spec))\\.(ts|tsx|js)$',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/node_modules/',
    '!src/__tests__/test-utils/**',
    '!src/**/*.type.ts',
    '!src/**/*.interface.ts',
    '!src/**/*.constants.ts',
    '!src/**/supportedLanguages.ts',
  ],
  coverageReporters: ['lcov', 'text'],
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 75,
      lines: 75,
      statements: -10,
    },
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-navigation|react-native-vector-icons|react-native-exit-app|react-native-recording|@react-native(-community)?)/)',
  ],
};
