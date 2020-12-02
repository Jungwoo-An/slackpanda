export function generateNonce() {
  return (Date.now() + Math.floor(Math.random() * 1000)).toString(16);
}
