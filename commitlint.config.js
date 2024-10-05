module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-max-length': [2, 'always', 400],
    'subject-case': [2, 'never', ['start-case', 'pascal-case']],
    'type-enum': [
      2,
      'always',
      ['ci', 'chore', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test', 'build'],
    ],
  },
};
