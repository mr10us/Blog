module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|@react-native-firebase)/)"
  ],
  setupFiles: ['<rootDir>/jest.setup.js'],
};
