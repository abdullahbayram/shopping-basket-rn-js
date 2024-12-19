module.exports = {
  preset: 'jest-expo',
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg|react-redux)',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  coverageThreshold: { global: { branches: 50, functions: 50, lines: 50, statements: 50 } },
  testPathIgnorePatterns: ['/__tests__/mocks/', '/__tests__/utils/'],
  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@constants/(.*)$': '<rootDir>/src/constants/$1',
    '^@context/(.*)$': '<rootDir>/src/context/$1',
    '^@redux/(.*)$': '<rootDir>/src/redux/$1',
    '^@screens/(.*)$': '<rootDir>/src/screens/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@validate/(.*)$': '<rootDir>/src/validate/$1',
  },
};
