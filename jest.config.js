module.exports = {
  preset: 'react-native',
  moduleNameMapper: {
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/jest/imageMock.js',
    '\\.(css|less)$': '<rootDir>/jest/imageMock.js',
  },
  setupFiles: ['<rootDir>/jest/setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|redux-flipper|flipper-redux-observer|redux-persist))',
  ],
};
