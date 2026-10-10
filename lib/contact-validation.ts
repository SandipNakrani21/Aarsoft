/** Optional phone number: validate the digits, not just separator characters. */
export function isValidPhone(input: string): boolean {
  const value = input.trim();
  if (!value) return true;
  return /^\+?[()\-.\s\d]{7,30}$/.test(value) && /^[0-9]{7,15}$/.test(value.replace(/\D/g, ''));
}
