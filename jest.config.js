module.exports = {
  preset: 'jest-expo',
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg|react-redux)',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  coverageThreshold: { global: { branches: 90, functions: 90, lines: 90, statements: 90 } },
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '__tests__',
    'mocks',
    '\\.style\\.js$',
    'src/components/atoms/index.js',
    'src/components/atoms/ActivityIndicator/index.js',
    'src/components/atoms/Appbar/index.js',
    'src/components/atoms/Card/index.js',
    'src/components/atoms/Icon/index.js',
    'src/components/atoms/Switch/index.js',
    'src/components/atoms/TextInput/index.js',
    'src/components/molecules/index.js',
    'src/components/organisms/index.js',
    'src/components/templates/index.js',
    'src/screens/index.js',
    'src/hooks/index.js',
    'src/screens/CheckoutScreen/components/index.js',
    'wdyr.js',
  ],
  testPathIgnorePatterns: ['/__tests__/mocks/', '/__tests__/utils/'],
  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@constants/(.*)$': '<rootDir>/src/constants/$1',
    '^@context/(.*)$': '<rootDir>/src/context/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@redux/(.*)$': '<rootDir>/src/redux/$1',
    '^@screens/(.*)$': '<rootDir>/src/screens/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@validate/(.*)$': '<rootDir>/src/validate/$1',
    '^@testUtils/(.*)$': '<rootDir>/__tests__/utils/$1',
    '^@mocks/(.*)$': '<rootDir>/mocks/$1',
  },
  coverageReporters: ['json', 'json-summary', 'text', 'lcov'],
  snapshotResolver: './scripts/snapshotResolver.js',
};
