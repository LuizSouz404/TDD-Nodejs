/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  roots: [
    '<rootDir>',
  ],
  testMatch: [
    '**/*.spec.ts',
  ],
  preset: 'ts-jest',
  transform: {
    "\\.[jt]sx?$": "babel-jest",
  },
};
