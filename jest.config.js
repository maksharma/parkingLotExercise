module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: ['**/?(*.)spec.+(ts|tsx|js)'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/src/build'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  collectCoverage: true,
  coverageReporters: ['cobertura', 'clover', 'json', 'lcov', 'text'],
  collectCoverageFrom: ['src/**/?(*.){js,ts,jsx,tsx}'],
  reporters: [
    'default',
    ['jest-junit', { outputName: 'zendesk-unit-test-results.xml' }],
  ],
}
