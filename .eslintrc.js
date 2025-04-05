module.exports = {
  extends: ['react-app', 'react-app/jest'],
  rules: {
    'no-unused-vars': 'warn', // Downgrade from error to warning
    'react-hooks/exhaustive-deps': 'warn', // Ensure this is a warning
  }
}; 