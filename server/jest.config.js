module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['.d.ts', '.js'],
};
jest.setTimeout(30000);
