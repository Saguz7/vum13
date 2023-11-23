module.exports = {
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '@public/components/(.*)': '<rootDir>/src/public/components/$1',
    },
    setupFilesAfterEnv: ['./node_modules/@testing-library/jest-dom/extend-expect'],

    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
  };
  