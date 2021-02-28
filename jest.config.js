module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  moduleDirectories: ['node_modules', 'src'],
};
