import test from 'node:test';
import assert from 'node:assert/strict';
import { isValidPhone } from '../lib/contact-validation.ts';

test('optional blank and supported international phone formats', () => {
  for (const input of ['', '  ', '+91 78787 82189', '+1 (202) 555-0123', '020 7946 0958']) assert.equal(isValidPhone(input), true, input);
});
test('rejects separator-only, misplaced plus, letters and invalid digit counts', () => {
  for (const input of ['-------', '() (). -', '12+3456789', 'call me', '+12345', '+1234567890123456']) assert.equal(isValidPhone(input), false, input);
});
