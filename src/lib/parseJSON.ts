// typescript-eslint.io/rules/no-explicit-any
export default function parseJSON(data: any) {
  return JSON.parse(JSON.stringify(data));
}
