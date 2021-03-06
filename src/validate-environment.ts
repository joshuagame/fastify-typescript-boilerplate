import assert from 'assert';

export function validateEnvironment({
  AWS_ACCESS_KEY_ID = '',
  AWS_SECRET_ACCESS_KEY = '',
  DATABASE_URL = '',
  EMAIL_ADDRESS = '',
  POSTGRES_DB = '',
  POSTGRES_USER = '',
  PRIVATE_KEY = '',
  PUBLIC_KEY = '',
}) {
  assert.notStrictEqual(
    AWS_ACCESS_KEY_ID,
    'CHANGEME',
    'AWS_ACCESS_KEY_ID is not set.',
  );
  assert.notStrictEqual(
    AWS_ACCESS_KEY_ID,
    '',
    'AWS_ACCESS_KEY_ID is set to the example value and will not work.',
  );
  assert.notStrictEqual(
    AWS_SECRET_ACCESS_KEY,
    '',
    'AWS_SECRET_ACCESS_KEY is not set.',
  );
  assert.notStrictEqual(
    AWS_SECRET_ACCESS_KEY,
    'CHANGEME',
    'AWS_ACCESS_KEY_ID is set to the example value and will not work',
  );
  assert.notStrictEqual(DATABASE_URL, '', 'DATABASE_URL is not set.');
  assert.notStrictEqual(EMAIL_ADDRESS, '', 'EMAIL_ADDRESS is not set.');
  assert.notStrictEqual(
    EMAIL_ADDRESS,
    'CHANGEME',
    'EMAIL_ADDRESS is set to default example value and will not work.',
  );
  assert.notStrictEqual(PRIVATE_KEY, '', 'PRIVATE_KEY is not set.');
  assert.notStrictEqual(PUBLIC_KEY, '', 'PUBLIC_KEY is not set.');
}
