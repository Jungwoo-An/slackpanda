export function generateNonce() {
  return Date.now().toString(16);
}
