module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 72],
    'scope-enum': [
      0,
      'always',
      [
        'twilio',
        'app',
        'common',
        'config',
        'db',
        'lib',
        'models',
        'routes',
        'services',
        'test',
        'utils',
      ],
    ],
  },
};
