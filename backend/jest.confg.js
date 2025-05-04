export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/__tests__/**/*.test.ts'],
    moduleFileExtensions: ['ts', 'js', 'json'],
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
     transformIgnorePatterns: [
    "/node_modules/(?!supertest)/"
  ],
  };
  